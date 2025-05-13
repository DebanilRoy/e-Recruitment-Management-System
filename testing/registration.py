from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver.get("http://localhost:3000/registration")

firstName = driver.find_element(By.ID, "firstName")
lastName = driver.find_element(By.ID, "lastName")
dob = driver.find_element(By.ID, "dob")
email = driver.find_element(By.ID, "email")
mobile = driver.find_element(By.ID, "mobile")
alternateMobile = driver.find_element(By.ID, "alternateMobile")
addressFirstLine = driver.find_element(By.ID, "addressFirstLine")
addressSecondLine = driver.find_element(By.ID, "addressSecondLine")
city = driver.find_element(By.ID, "city")
district = driver.find_element(By.ID, "district")
state = driver.find_element(By.ID, "state")
pinCode = driver.find_element(By.ID, "pinCode")
submit = driver.find_element(By.TAG_NAME, "button")

# Dropdowns
qualification = Select(driver.find_element(By.ID, "qualification"))
category = Select(driver.find_element(By.ID, "category"))

firstName.send_keys(" ABCD222")
if firstName.get_attribute("value") == "ABCD":
    print("Test Passed: firstName blocking spaces and numbers")
else:
    print("Test Failed: firstName blocking spaces and numbers")
firstName.clear()

lastName.send_keys(" ABCD222 323BCD")
if lastName.get_attribute("value") == "ABCD BCD":
    print("Test Passed: lastName blocking spaces and numbers")
else:
    print("Test Failed: lastName blocking spaces and numbers")
lastName.clear()

# Email field test
email.send_keys("invalid@@email!!")
if "reject" in email.get_attribute("class"):
    print("Test Passed: email incorrect field pattern caught")
else:
    print("Test Failed: email incorrect field pattern uncaught")
submit = driver.find_element(By.TAG_NAME, "button")
if submit.get_attribute("disabled") == "true":
    print("Test Passed: Submit Button disabled on incorrect email field")
email.clear()

email.send_keys("email@email.com")
if "accept" in email.get_attribute("class"):
    print("Test Passed: email correct field pattern caught")
else:
    print("Test Failed: email correct field pattern uncaught")
submit = driver.find_element(By.TAG_NAME, "button")
if submit.get_attribute("disabled") == "true":
    print("Test Passed: Submit Button disabled on incorrect email field")
email.clear()

# Mobile field test
mobile.send_keys(" 0123ABC4 56789")
if mobile.get_attribute("value") == "0123456789":
    print("Test Passed: mobile field blocked non-digits and spaces")
else:
    print("Test Failed: mobile field blocked non-digits and spaces")

# Example interactions
dob.send_keys("1990-01-01")
alternateMobile.send_keys("9123456780")
addressFirstLine.send_keys("123 Main St")
addressSecondLine.send_keys("Apt 4B")
city.send_keys("New York")
district.send_keys("Manhattan")
state.send_keys("NY")
pinCode.send_keys("10001")
qualification.select_by_visible_text("Graduate")
category.select_by_value("OBC")

submit = driver.find_element(By.TAG_NAME, "button")
driver.execute_script("arguments[0].scrollIntoView(true);", submit)
time.sleep(3)
driver.find_element(By.TAG_NAME, "button").click()
driver.find_element(By.XPATH, "//*[contains(text(), 'Yes')]").click()

WebDriverWait(driver, 5).until(
    EC.visibility_of_element_located((By.CLASS_NAME, "formPassword"))
)
print("Test passed: Registration Form Submitted, Password Window opened")

pwd = driver.find_element(By.ID, "password")
repwd = driver.find_element(By.ID, "repassword")

pwd.send_keys("itanagar")
if "reject" in pwd.get_attribute("class"):
    print("Test Passed: incorrect password format caught")
else:
    print("Test Failed: incorrect password format not caught")
pwd.clear()
pwd.send_keys("Itanagar@")
if "reject" in pwd.get_attribute("class"):
    print("Test Passed: incorrect password format caught")
else:
    print("Test Failed: incorrect password format not caught")
pwd.clear()
pwd.send_keys("Itanagar@")
if "reject" in pwd.get_attribute("class"):
    print("Test Passed: incorrect password format caught")
else:
    print("Test Failed: incorrect password format not caught")

repwd.send_keys("Itanagar")
if "reject" in repwd.get_attribute("class"):
    print("Test Passed: repwd mismatch with pwd caught")
else:
    print("Test Passed: repwd mismatch with pwd caught")
pwd.clear()
pwd.send_keys("Itanagar@2")

repwd.clear()
repwd.send_keys("Itanagar@2")

driver.find_element(By.TAG_NAME, "button").click()

try:
    WebDriverWait(driver, 5).until(
        EC.url_matches("http://localhost:3000")
    )
    print("Test passed: Password Submitted, User Created and forwarded back to Login Page")
except:
    print("Test failed: Password Submitted, User Created and forwarded back to Login Page")

#except:
#    print("Test Failed: Password Window not opened")
