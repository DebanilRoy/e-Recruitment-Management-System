import chromedriverimport as ChromeDriver
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.keys import Keys
import loginscript
import time

link = ChromeDriver.driver.find_element(ChromeDriver.By.LINK_TEXT, "Add/Modify Subjects")
link.click()

print("Opened Add/Modify Subjects page")

print("Locating recruitment select box...")
print("Selecting R004...")
recruitment_select = ChromeDriver.driver.find_element(ChromeDriver.By.ID, "recruitmentID")
recruitment_select.click()
time.sleep(2)

Select(recruitment_select).select_by_visible_text("R004")


# Submit the recruitment selection
submit_button = ChromeDriver.driver.find_element(ChromeDriver.By.XPATH, "//button[contains(text(), 'Submit')]")
submit_button.click()
print("Submitted recruitment selection")

# Allow subjects input to load
time.sleep(2)

# Step 2: Add three subjects
print("Entering first subject...")
subject_inputs = ChromeDriver.driver.find_elements(ChromeDriver.By.CSS_SELECTOR, "input[placeholder='Subject Name']")
first_subject = subject_inputs[0]
first_subject.click()
first_subject.send_keys("Math")
time.sleep(1)

# A new input should appear, find it and enter second subject
subject_inputs = ChromeDriver.driver.find_elements(ChromeDriver.By.CSS_SELECTOR, "input[placeholder='Subject Name']")
second_subject = subject_inputs[-1]
second_subject.click()
second_subject.send_keys("Science")
time.sleep(1)

# Another input appears, enter third subject
subject_inputs = ChromeDriver.driver.find_elements(ChromeDriver.By.CSS_SELECTOR, "input[placeholder='Subject Name']")
third_subject = subject_inputs[-1]
third_subject.send_keys("History")
time.sleep(1)

# Remove first subject ChromeDriver.By clearing and tabbing out
first_subject.clear()
first_subject.send_keys(Keys.TAB)
time.sleep(1)

# Submit the subject list
submit_button = ChromeDriver.driver.find_element(ChromeDriver.By.XPATH, "//button[contains(text(), 'Save')]")
submit_button.click()

# Check for "SUBJECTS SAVED" notification
time.sleep(2)
try:
    notification = ChromeDriver.driver.find_element(ChromeDriver.By.XPATH, "//*[contains(text(), 'SUBJECTS SAVED')]")
    print("Notification appeared:", notification.text)
except:
    print("'SUBJECTS SAVED' notification not found.")

# Cleanup
ChromeDriver.driver.quit()