import chromedriverimport as ChromeDriver
import time
import loginscript

# === Go to "Open Offers" page ===
open_offers_link = ChromeDriver.driver.find_element(ChromeDriver.By.LINK_TEXT, "Open Offers")
open_offers_link.click()
print("Navigated to 'Open Offers' page.")
time.sleep(2)  # Let the page load

cards = ChromeDriver.driver.find_elements(ChromeDriver.By.CLASS_NAME, "cardAppointment")
target_card = None

for card in cards:
    post_element = card.find_element(ChromeDriver.By.XPATH, ".//p[contains(text(),'Post:')]/span")
    post_text = post_element.text.strip()
    if post_text == "HR Manager":
        target_card = card
        break

if target_card:
    print("Found appointment card for post 'HR Manager'.")

    # === Click "Reject" button ===
    reject_button = target_card.find_element(ChromeDriver.By.XPATH, ".//button[contains(text(),'Accept')]")
    reject_button.click()
    print("Clicked 'Accept' button.")
    time.sleep(1)

    # === In modal, click "No" first ===
    no_button = ChromeDriver.driver.find_element(ChromeDriver.By.XPATH, "//button[contains(text(),'No')]")
    no_button.click()
    print("Clicked 'No' in confirmation modal.")
    time.sleep(1)

    # === Click "Reject" again, then "Yes" ===
    reject_button = target_card.find_element(ChromeDriver.By.XPATH, ".//button[contains(text(),'Accept')]")
    reject_button.click()
    print("Clicked 'Accept' again.")
    time.sleep(1)

    yes_button = ChromeDriver.driver.find_element(ChromeDriver.By.XPATH, "//button[contains(text(),'Yes')]")
    yes_button.click()
    print("Confirmed Acceptance By clicking 'Yes'.")
    time.sleep(1)

    # === Check for notification ===
    notification = ChromeDriver.driver.find_element(ChromeDriver.By.XPATH, "//div[contains(@class,'notification') and contains(@class,'isActive')]//p")
    if "OFFER ACCEPTED" in notification.text.strip():
        print("Test Passed: Notification appeared after acceptance.")
    else:
        print("Test Failed: Notification not found or message mismatch.")
else:
    print("Appointment card with post 'HR Manager' not found.")


## It was found during testing that the accept/reject button executed the API call before receiving the confirmation.