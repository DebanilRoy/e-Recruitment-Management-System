import chromedriverimport as ChromeDriver
import loginscript
import time

#  Assign elements to variables first
post_name = ChromeDriver.driver.find_element(ChromeDriver.By.ID, "postName")
salary = ChromeDriver.driver.find_element(ChromeDriver.By.ID, "salary")
location = ChromeDriver.driver.find_element(ChromeDriver.By.ID, "location")
vacancy_total = ChromeDriver.driver.find_element(ChromeDriver.By.ID, "vacancyTotal")
vacancy_gen = ChromeDriver.driver.find_element(ChromeDriver.By.ID, "vacancyGEN")
vacancy_sc = ChromeDriver.driver.find_element(ChromeDriver.By.ID, "vacancySC")
vacancy_st = ChromeDriver.driver.find_element(ChromeDriver.By.ID, "vacancyST")
vacancy_obc = ChromeDriver.driver.find_element(ChromeDriver.By.ID, "vacancyOBC")
date_published = ChromeDriver.driver.find_element(ChromeDriver.By.ID, "datePublished")
app_last_date = ChromeDriver.driver.find_element(ChromeDriver.By.ID, "appLastDate")
submit_btn = ChromeDriver.driver.find_element(ChromeDriver.By.CSS_SELECTOR, ".buttonSubmit")

#  Fill only some fields
post_name.send_keys("Software Engineer")
salary.send_keys("70000")
location.send_keys("New York")

# Check if submit button is disabled

print("[Step 1] Submit button disabled?", not submit_btn.is_enabled())
time.sleep(1)

#  Fill all fields with incorrect vacancy sum
vacancy_total.send_keys("10")
vacancy_gen.send_keys("3")
vacancy_sc.send_keys("3")
vacancy_st.send_keys("2")
vacancy_obc.send_keys("1")  # Sum = 9 (incorrect)
date_published.send_keys("01-06-2025")
app_last_date.send_keys("30-06-2025")

time.sleep(1)
print("[Step 2] Submit button disabled (incorrect sum)?", not submit_btn.is_enabled())

#  Correct the OBC vacancy to make total correct
vacancy_obc.clear()
vacancy_obc.send_keys("2")  # Sum = 10 (correct)

time.sleep(1)
print("[Step 3] Submit button enabled (correct sum)?", submit_btn.is_enabled())

#  Submit form
if submit_btn.is_enabled():
    ChromeDriver.driver.execute_script("arguments[0].scrollIntoView(true);", submit_btn)
    time.sleep(2)
    submit_btn.click()
    print("[Step 4] Submit clicked.")

    no_button = ChromeDriver.driver.find_element(ChromeDriver.By.XPATH, "//button[contains(text(),'No')]")
    no_button.click()
    print("Clicked 'No' in confirmation modal.")
    time.sleep(1)

    submit_btn.click()
    print("[Step 5] Submit clicked again.")

    yes_button = ChromeDriver.driver.find_element(ChromeDriver.By.XPATH, "//button[contains(text(),'Yes')]")
    yes_button.click()
    print("Confirmed Acceptance By clicking 'Yes'.")
    time.sleep(1)

#  time.wait for notification
time.sleep(2)
try:
    notification = ChromeDriver.driver.find_element(ChromeDriver.By.CSS_SELECTOR, ".notification")  # Adjust selector
    if "RECRUITMENT CREATED" in notification.text:
        print("Recruitment Created notification displayed!")
    else:
        print("Unexpected notification text:", notification.text)
except:
    print("Notification not found!")

# Cleanup
ChromeDriver.driver.quit()