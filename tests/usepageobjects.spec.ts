import { expect, test } from '@playwright/test'
import { FormLayoutPage } from '../page-objects/formLayoutPage'
import { NavigationPage } from '../page-objects/navigationPage'

test.beforeEach(async( {page}) =>{
    await page.goto('http://localhost:4200/pages/iot-dashboard')
})

test('navigate to form page', async({ page }) =>{

    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutPage()
    await navigateTo.datepickerPage()

})

test('parameterized methods', async({ page }) => {
    const navigateTo = new NavigationPage(page)
    const onFormLayoutsPage = new FormLayoutPage(page)

    await navigateTo.formLayoutPage()
    await onFormLayoutsPage.submitUsingTheGridormWithCredentialsandSelectOptions('test@test.com', 'Welcome1','Option 1')
    await onFormLayoutsPage.submitInLineFormWithNameEmailAndCheckbox('John Smith', 'John@test.com', true)
})