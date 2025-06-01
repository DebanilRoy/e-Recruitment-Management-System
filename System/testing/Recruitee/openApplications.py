import chromedriverimport as ChromeDriver
import time
import loginscript

# === 1️⃣ Go to "Open Applications" page ===
# Find the link by its text and click it
open_applications_link = ChromeDriver.driver.find_element(ChromeDriver.By.LINK_TEXT, "Open Applications")
open_applications_link.click()
print("Navigated to 'Open Applications' page.")
time.sleep(2)  # Let the page load

# === 2️⃣ Find the application card with recruitment ID "R001" ===
cards = ChromeDriver.driver.find_elements(ChromeDriver.By.CLASS_NAME, "cardApplication")
target_card = None

for card in cards:
    recruitment_id_element = card.find_element(ChromeDriver.By.XPATH, ".//p[contains(., 'Post')]")
    recruitment_id_text = recruitment_id_element.text
    if "HR Manager" in recruitment_id_text:
        target_card = card
        break

if target_card:
    print("Found application card for HR Manager.")

    # === 3️⃣ Click the "Status" button ===
    status_button = target_card.find_element(ChromeDriver.By.XPATH, ".//button[contains(text(),'Status')]")
    status_button.click()
    print("Clicked 'Status' button.")
    time.sleep(1)  # Let the status pane load

    # === 4️⃣ Click the "Cancel Application" button in the status pane ===
    cancel_button = ChromeDriver.driver.find_element(ChromeDriver.By.XPATH, "//button[contains(text(),'Cancel Application')]")
    cancel_button.click()

    print("Clicked 'Cancel Application' button.")
    time.sleep(1)

    confirm_no_button = ChromeDriver.driver.find_element(ChromeDriver.By.XPATH, "//button[contains(text(),'No')]")
    confirm_no_button.click()
    print("Clicked 'No' on the confirmation modal.")
    time.sleep(1)  # Let it return to the form

    cancel_button.click()
    
    # === Click the "Yes" button on the confirm modal ===
    confirm_yes_button = ChromeDriver.driver.find_element(ChromeDriver.By.XPATH, "//button[contains(text(),'Yes')]")
    confirm_yes_button.click()
    print("Clicked 'Yes' on the confirmation modal.")
    
    time.sleep(4)

    # === 6️⃣ Check for notification popup ===
    notification = ChromeDriver.driver.find_element(ChromeDriver.By.XPATH, "//div[contains(@class,'notification') and contains(@class,'isActive')]//p")
    if notification.text.strip() == "APPLICATION CANCELLED":
        print("Test Passed: Application was cancelled successfully and notification appeared.")
    else:
        print("Test Failed: Notification did not show expected message.")

else:
    print("HR Manager application card not found.")