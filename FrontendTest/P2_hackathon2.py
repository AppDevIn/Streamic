from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import pytest

PATH = "C:\Program Files (x86)\chromedriver.exe"  # set up path for driver
driver = webdriver.Chrome(PATH)  # set up driver

driver.get("http://localhost:3000/")

email = driver.find_element_by_name("email")
password = driver.find_element_by_name("password")

login = driver.find_element_by_link_text("Log In")


def test_login():
    main = WebDriverWait(driver, 10).until(  # driver waits max 10 seconds until
        EC.presence_of_element_located((By.NAME, "email"))
    )
    main.send_keys("schoysm@gmail.com")
    # main.send_keys("s2345678902342@gmail.com")

    main = WebDriverWait(driver, 10).until(  # driver waits max 10 seconds until
        EC.presence_of_element_located((By.NAME, "password"))
    )
    main.send_keys("SandraTEST123")

    login.click()


def test_createroom():
    main = WebDriverWait(driver, 10).until(  # driver waits max 10 seconds until
        EC.presence_of_element_located((By.XPATH, "//*[contains(@class,'MuiFab-label') and text() = ' Add Room ']"))
    )
    main.click()

    driver.implicitly_wait(7)

    room = driver.find_element_by_name("name")

    room.clear()
    room.send_keys("TEST ROOM")

    driver.implicitly_wait(7)

    # cancel = driver.find_element_by_css_selector(".ui.black.button")
    # cancel.click()

    create = driver.find_element_by_xpath(
        "//*[contains(@class,'ui icon positive right labeled button') and text() = 'Create']")
    create.click()


# def test_joinroom():
#     main = WebDriverWait(driver, 10).until(  # driver waits max 10 seconds until
#         EC.presence_of_element_located((By.XPATH, "//*[contains(@class,'MuiFab-label') and text() = 'Join Room ']"))
#     )
#     main.click()
#
#     room = driver.find_element_by_name("name")
#
#     room.send_keys("2")
#     join = driver.find_element_by_xpath(
#         "//*[contains(@class,'ui icon positive right labeled button') and text() = 'Join']")
#
#     join.click()


def test_testroom():
    main = WebDriverWait(driver, 10).until(  # driver waits max 10 seconds until
        EC.presence_of_element_located((By.LINK_TEXT, "TEST ROOM"))
    )
    main.click()

    # main = WebDriverWait(driver, 10).until(  # driver waits max 10 seconds until
    #     EC.presence_of_element_located((By.XPATH, "//textarea[@rows='3']"))
    # )
    # main.click()
    #
    # main.send_keys("Test message 2")
    #
    # reply = main.find_element_by_xpath(
    #     "//*[contains(@class,'ui icon primary left labeled button') and text() = 'Add Reply']")
    # reply.click()
