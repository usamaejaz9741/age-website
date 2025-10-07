from playwright.sync_api import Page, expect, Error

def test_homepage_loads(page: Page):
    """
    This test verifies that the homepage loads correctly.
    """
    try:
        print("Navigating to the homepage...")
        # 1. Arrange: Go to the homepage with a timeout.
        page.goto("http://localhost:8080/", timeout=60000)
        print("Navigation complete.")

        print("Checking page title...")
        # 2. Assert: Confirm the page title is correct.
        expect(page).to_have_title("Alvi Global Enterprises - AI-Powered Business Solutions")
        print("Page title is correct.")

        print("Taking screenshot...")
        # 3. Screenshot: Capture the final result for visual verification.
        page.screenshot(path="jules-scratch/verification/verification.png")
        print("Screenshot taken successfully.")

    except Error as e:
        print(f"An error occurred: {e}")
        # Re-raise the exception to fail the test
        raise