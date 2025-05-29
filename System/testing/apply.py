# === IMPORTS ===
import chromedriverimport as DriverImport
import loginscript
import time

# === Find all the recruitment cards ===
cards = DriverImport.driver.find_elements(DriverImport.By.CLASS_NAME, "cardViewRecruitments")

# === Loop through each card and find the one with Recruitment ID "R001" ===
for card in cards:
    recruitment_id_element = card.find_element(DriverImport.By.XPATH, ".//p[contains(., 'Recruitment ID')]")
    recruitment_id_text = recruitment_id_element.text
    if "R001" in recruitment_id_text:
        target_card = card
        break

if target_card:
    # === Click the "Apply" button ===
    apply_button = target_card.find_element(DriverImport.By.XPATH, ".//button[contains(text(),'Apply')]")
    apply_button.click()
    print("Clicked 'Apply' for Recruitment ID R001.")
    time.sleep(1)  # Let the form load

    # === Find and scroll to the "Submit" button ===
    submit_button = DriverImport.driver.find_element(DriverImport.By.XPATH, "//button[contains(text(),'Submit')]")
    DriverImport.driver.execute_script("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", submit_button)
    time.sleep(1)  # Slight pause to allow smooth scrolling
    submit_button.click()
    time.sleep(1)

    # === Click the "No" button first to cancel ===
    confirm_no_button = DriverImport.driver.find_element(DriverImport.By.XPATH, "//button[contains(text(),'No')]")
    confirm_no_button.click()
    print("Clicked 'No' on the confirmation modal.")
    time.sleep(1)  # Let it return to the form

    submit_button.click()
    # === Click the "Yes" button on the confirm modal ===
    confirm_yes_button = DriverImport.driver.find_element(DriverImport.By.XPATH, "//button[contains(text(),'Yes')]")
    confirm_yes_button.click()
    
    recruitment_open_page = DriverImport.driver.find_element(DriverImport.By.XPATH, "//span[contains(text(), 'Open Recruitments')]")
    
    if recruitment_open_page: 
        print("Clicked 'Yes' on the confirmation modal. Back to Recruitments Open Page")
    else:
        print("Clicked 'Yes' on the confirmation modal. Not Back to Recruitments Open Page")

else:
    print("Recruitment ID R001 not found.")

time.sleep(2)