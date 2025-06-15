import chromedriverimport as ChromeDriver
import loginscript
import time

# 1. Click on "Create Rank List" from sidebar
link = ChromeDriver.driver.find_element(ChromeDriver.By.LINK_TEXT, "Create Rank List")
link.click()
print("Opened Manage Recruitments page")

time.sleep(2)

# 2. Select recruitment ID "R006"
print("Selecting recruitment ID 'R006'...")
select_element = ChromeDriver.driver.find_element(ChromeDriver.By.TAG_NAME, "select")
select_element.click()
ChromeDriver.Select(select_element).select_by_visible_text("R006")
time.sleep(1)

# 3. Click Submit
print("Submitting form...")
submit_button = ChromeDriver.driver.find_element(ChromeDriver.By.XPATH, "//button[contains(text(), 'Submit')]")
submit_button.click()
time.sleep(2)

# 4. Click Freeze Rank List
print("Clicking 'Freeze Rank List' button...")
freeze_button = ChromeDriver.driver.find_element(ChromeDriver.By.XPATH, "//button[contains(text(), 'Freeze Rank List')]")
freeze_button.click()
time.sleep(2)

yes_button = ChromeDriver.driver.find_element(ChromeDriver.By.XPATH, "//button[contains(text(),'Yes')]")
yes_button.click()
print("Confirmed Acceptance By clicking 'Yes'.")
time.sleep(1)

# 5. Reload the page
print("Reloading page...")
ChromeDriver.driver.refresh()
time.sleep(3)

# 6. Select recruitment ID "R006" and Submitting
print("Selecting recruitment ID 'R006'...")
select_element = ChromeDriver.driver.find_element(ChromeDriver.By.TAG_NAME, "select")
select_element.click()
ChromeDriver.Select(select_element).select_by_visible_text("R006")
time.sleep(1)

print("Submitting form...")
submit_button = ChromeDriver.driver.find_element(ChromeDriver.By.XPATH, "//button[contains(text(), 'Submit')]")
submit_button.click()
time.sleep(2)

# 7. Verify that "Freeze Rank List" button is gone and text is visible
print("Verifying if rank list is frozen...")
page_source = ChromeDriver.driver.page_source
if "Rank List Frozen" in page_source:
    print("Rank List successfully frozen.")
else:
    print("'Rank List Frozen' text not found or button still visible.")