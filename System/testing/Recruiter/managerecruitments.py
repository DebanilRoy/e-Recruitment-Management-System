import chromedriverimport as ChromeDriver
import loginscript
import time

# Go to Manage Recruitments page
link = ChromeDriver.driver.find_element(ChromeDriver.By.LINK_TEXT, "Manage Recruitments")
link.click()
print("Opened Manage Recruitments page")

# Wait for cards to load
time.sleep(3)

# Find all recruitment cards
cards = ChromeDriver.driver.find_elements(ChromeDriver.By.CLASS_NAME, "cardManageRecruitments")  # Adjust class if needed
print(f"Found {len(cards)} recruitment cards")


# Look for the one with recruitmentID = R004
target_card = None
for card in cards:
    if "R006" in card.text:
        target_card = card
        break

if not target_card:
    print("Recruitment ID 'R006' not found.")
    ChromeDriver.driver.quit()
    exit()

print("Found card for recruitmentID: R006")

# Click Edit button inside the card
ChromeDriver.driver.execute_script("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", target_card)

time.sleep(3)

edit_button = target_card.find_element(ChromeDriver.By.XPATH, ".//button[contains(text(), 'Edit')]")  # Adjust class if needed
edit_button.click()
print("Clicked Edit button")
# Wait for panel to open
time.sleep(2)

# Fill in GEN Vacancies
gen_input = ChromeDriver.driver.find_element(ChromeDriver.By.ID, "vacancyGEN")
gen_input.clear()
gen_input.send_keys("4")
print("Updated GEN vacancies to 4")

# Fill in Total Vacancies
total_input = ChromeDriver.driver.find_element(ChromeDriver.By.ID, "vacancyTotal")
total_input.clear()
total_input.send_keys("8")
print("Updated Total vacancies to 8")

# Click Save button
save_button = ChromeDriver.driver.find_element(ChromeDriver.By.XPATH, "//button[contains(text(), 'Save')]")  # Adjust if needed
save_button.click()
print("Clicked Save")

# Wait for notification
time.sleep(2)
try:
    notification = ChromeDriver.driver.find_element(ChromeDriver.By.XPATH, "//*[contains(text(), 'RECRUITMENT INFO SAVED')]")
    print("Notification appeared:", notification.text)
except:
    print("'SUBJECTS SAVED' notification not found.")