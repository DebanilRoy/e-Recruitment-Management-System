import chromedriverimport as ChromeDriver
import loginscript
import random
import time

# Go to Manage Recruitments page
link = ChromeDriver.driver.find_element(ChromeDriver.By.LINK_TEXT, "Submit Results")
link.click()
print("Opened Manage Recruitments page")

time.sleep(2)

# Select recruitmentID "R004"
print("Selecting recruitment ID 'R004'...")
recruitment_select = ChromeDriver.driver.find_element(ChromeDriver.By.ID, "recruitmentID")
recruitment_select.click()
ChromeDriver.Select(recruitment_select).select_by_visible_text("R004")
submit_button = ChromeDriver.driver.find_element(ChromeDriver.By.XPATH, "//button[contains(text(), 'Submit')]")
submit_button.click()

time.sleep(3)

# Helper to fill result row
def fill_result_row(row_element, application_id):
    print(f"Filling row for application ID: {application_id}")
    inputs = row_element.find_elements(ChromeDriver.By.XPATH, ".//input")
    if not inputs or len(inputs) < 4:
        print("Not enough input fields found in the row")
        return
    inputs[0].send_keys(application_id)
    for i in range(1, 4):
        inputs[i].send_keys(str(random.randint(0, 100)))

time.sleep(2)
# Fill first row with DEF002
print("Filling first result row...")
rows = ChromeDriver.driver.find_elements(ChromeDriver.By.TAG_NAME, "tr")
print(f"Rows: {len(rows)}")
latest_row = rows[2]
fill_result_row(latest_row, "MNO005")

time.sleep(2)

# Wait for new empty row to appear
print("Waiting for new row to appear...")
time.sleep(2)
rows = ChromeDriver.driver.find_elements(ChromeDriver.By.TAG_NAME, "tr")
new_latest_row = rows[2]
fill_result_row(new_latest_row, "ABC001")

time.sleep(1)

# Click Save button
print("Clicking Save button...")
save_button = ChromeDriver.driver.find_element(ChromeDriver.By.XPATH, "//button[contains(text(), 'Save')]")
save_button.click()

# Wait for notification
print("Waiting for confirmation notification...")
time.sleep(3)
notifications = ChromeDriver.driver.find_elements(ChromeDriver.By.CLASS_NAME, "notification")
for note in notifications:
    if "RESULTS SAVED" in note.text:
        print("Notification received: RESULTS SAVED")
        break
else:
    print("Notification not found.")
