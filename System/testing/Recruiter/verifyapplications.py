import chromedriverimport as ChromeDriver
import loginscript
import time

# 1. Click "Verify Applications" from sidebar
link = ChromeDriver.driver.find_element(ChromeDriver.By.LINK_TEXT, "Verify Applications")
link.click()
print("Opened Manage Recruitments page")
time.sleep(2)

# 2. Select recruitmentID "R004"
print("Selecting recruitment ID 'R004'...")
select_element = ChromeDriver.driver.find_element(ChromeDriver.By.TAG_NAME, "select")
select_element.click()
ChromeDriver.Select(select_element).select_by_visible_text("R004")
time.sleep(1)

# 3. Click Submit
print("Submitting form...")
submit_button = ChromeDriver.driver.find_element(ChromeDriver.By.XPATH, "//button[contains(text(), 'Submit')]")
submit_button.click()
time.sleep(2)

# 4. Check checkboxes for applicationIDs "DEF002" and "GHI003"
print("Checking application rows for 'DEF002' and 'GHI003'...")
target_ids = {"DEF002", "GHI003"}
rows = ChromeDriver.driver.find_elements(ChromeDriver.By.TAG_NAME, "tr")

for row in rows:
    columns = row.find_elements(ChromeDriver.By.TAG_NAME, "td")
    if len(columns) > 2:  # Make sure the third column exists
        application_id = columns[2].text.strip()
        if application_id in target_ids:
            checkbox = columns[0].find_element(ChromeDriver.By.TAG_NAME, "input")
            checkbox.click()
            print(f"✓ Checked {application_id}")
time.sleep(1)


# 5. Click "Verify"
print("Clicking 'Verify' button...")
accept_button = ChromeDriver.driver.find_element(ChromeDriver.By.XPATH, "//button[contains(text(), 'Verify')]")
accept_button.click()
time.sleep(2)

yes_button = ChromeDriver.driver.find_element(ChromeDriver.By.XPATH, "//button[contains(text(),'Yes')]")
yes_button.click()
print("Confirmed Acceptance By clicking 'Yes'.")
time.sleep(1)

# 6. Check for notification
print("Checking for success notification...")
if "APPLICATIONS VERIFIED" in ChromeDriver.driver.page_source:
    print("Applications successfully verified.")
else:
    print("Verification failed or notification not found.")