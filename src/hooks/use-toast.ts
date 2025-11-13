import * as React from "react";

import type { ToastActionElement, ToastProps } from "@/components/ui/toast";

/**
 * Maximum number of toasts that can be displayed simultaneously
 */
const TOAST_LIMIT = 1;

/**
 * Delay in milliseconds before a dismissed toast is removed from the DOM
 * 
 * Current value: 1000000ms (1000 seconds / ~16.67 minutes)
 * This extended delay keeps dismissed toasts in memory for potential re-display
 * or undo functionality, though they are not visible on screen.
 * 
 * Note: This is intentionally set high to prevent premature cleanup.
 * Consider reducing to 5000ms (5 seconds) if memory usage is a concern.
 */
const TOAST_REMOVE_DELAY = 1000000;

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

/**
 * Global counter for generating unique toast IDs
 * Uses modulo to prevent overflow and ensure IDs remain within safe integer range
 */
let count = 0;

/**
 * Generates a unique ID for toast notifications
 * 
 * Creates sequential numeric IDs that wrap around at MAX_SAFE_INTEGER
 * to prevent overflow while maintaining uniqueness for active toasts.
 * 
 * @returns {string} A unique string ID for the toast
 * @private
 */
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type Action =
  | {
      type: "ADD_TOAST";
      toast: ToasterToast;
    }
  | {
      type: "UPDATE_TOAST";
      toast: Partial<ToasterToast>;
    }
  | {
      type: "DISMISS_TOAST";
      toastId?: ToasterToast["id"];
    }
  | {
      type: "REMOVE_TOAST";
      toastId?: ToasterToast["id"];
    };

interface State {
  toasts: ToasterToast[];
}

/**
 * Global map tracking timeout IDs for toast removal
 * Allows cleanup of pending timeouts when toasts are dismissed early
 */
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

/**
 * Adds a toast to the removal queue with a delay
 * 
 * Schedules a toast for removal after TOAST_REMOVE_DELAY milliseconds.
 * If the toast is already queued, the existing timeout is cleared and replaced.
 * 
 * @param {string} toastId - The ID of the toast to queue for removal
 * @private
 */
const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

/**
 * Toast state reducer function
 * 
 * Manages toast state transitions based on dispatched actions.
 * Handles adding, updating, dismissing, and removing toasts from the queue.
 * 
 * @param {State} state - Current toast state
 * @param {Action} action - Action to perform on the state
 * @returns {State} New toast state after applying the action
 * 
 * @actions
 * - ADD_TOAST: Adds a new toast (respects TOAST_LIMIT)
 * - UPDATE_TOAST: Updates an existing toast by ID
 * - DISMISS_TOAST: Marks toast as closed and queues for removal
 * - REMOVE_TOAST: Removes toast from state completely
 */
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      };

    case "DISMISS_TOAST": {
      const { toastId } = action;

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t,
        ),
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

/**
 * Global listeners array for state change subscriptions
 * Components can subscribe to toast state changes via these listeners
 */
const listeners: Array<(state: State) => void> = [];

/**
 * Global in-memory state for toasts
 * Persists across component re-renders to maintain toast queue
 */
let memoryState: State = { toasts: [] };

/**
 * Dispatches an action to update toast state
 * 
 * Applies the action to the current state using the reducer and notifies
 * all subscribed listeners of the state change.
 * 
 * @param {Action} action - The action to dispatch
 * @private
 */
function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

type Toast = Omit<ToasterToast, "id">;

/**
 * Creates and displays a toast notification
 * 
 * This is the primary function for creating toast notifications. It automatically
 * generates a unique ID, manages state, and provides methods for updating and dismissing.
 * 
 * @param {Toast} props - Toast configuration (title, description, variant, etc.)
 * @returns {Object} Object containing toast properties and control methods
 * @returns {string} returns.id - Unique ID of the created toast
 * @returns {Function} returns.dismiss - Function to dismiss the toast
 * @returns {Function} returns.update - Function to update toast properties
 * 
 * @example
 * ```typescript
 * // Simple success toast
 * toast({
 *   title: "Success!",
 *   description: "Your changes have been saved.",
 *   variant: "default"
 * });
 * 
 * // Toast with update capability
 * const { id, update } = toast({ title: "Processing..." });
 * setTimeout(() => update({ title: "Complete!" }), 2000);
 * ```
 */
function toast({ ...props }: Toast) {
  const id = genId();

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id: id,
    dismiss,
    update,
  };
}

/**
 * React hook for managing toast notifications
 * 
 * Provides access to the toast state and methods for displaying toasts.
 * Automatically subscribes to toast state changes and cleans up on unmount.
 * 
 * @returns {Object} Toast management object
 * @returns {ToasterToast[]} returns.toasts - Array of currently active toasts
 * @returns {Function} returns.toast - Function to create a new toast
 * @returns {Function} returns.dismiss - Function to dismiss a specific toast or all toasts
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { toast } = useToast();
 *   
 *   const handleClick = () => {
 *     toast({
 *       title: "Success!",
 *       description: "Operation completed successfully"
 *     });
 *   };
 *   
 *   return <button onClick={handleClick}>Show Toast</button>;
 * }
 * ```
 */
function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
}

export { useToast, toast };
