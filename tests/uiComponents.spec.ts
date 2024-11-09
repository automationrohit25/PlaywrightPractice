import { expect, test } from '@playwright/test'
import exp from 'constants'

test.beforeEach(async({ page }) => {
    await page.goto(' http://localhost:4200/')
})

test('tooltips',async ({ page }) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    const tooltipCard = page.locator('nb-card', { hasText: "Tooltip Placements"})
    await tooltipCard.getByRole('button', { name: "Top"}).hover()

    const tooltip = await page.locator('nb-tooltip').textContent()
    expect(tooltip).toEqual('This is a tooltip')
})

test('dialog box', async({ page }) =>{
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })
    await page.getByRole('table').locator('tr', {hasText: "mdo@gmail.com"}).locator('.nb-trash').click()

})

test('web tables', async({ page }) =>{
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    const targetRow = page.getByRole('row', {name: "twitter@outlook.com"})
    await targetRow.locator('.nb-edit').click()

    await page.locator('input-editor').getByPlaceholder('Age').clear()
    await page.locator('input-editor').getByPlaceholder('Age').fill('35')
    await page.locator('.nb-checkmark').click()

    //get the row based on the value in the specific column

    await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
    const targetRowById = page.getByRole('row', { name: "11"}).filter({ has: page.locator('td').nth(1).getByText('11')})
    await targetRowById.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('E-mail').clear()
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@test.com')
    await page.locator('.nb-checkmark').click()
    await expect(targetRowById.locator('td').nth(5)).toHaveText('test@test.com')

    // test filter of the table

    const ages = ["20", "30", "40", "200"]

    for(let age of ages){

        await page.locator('input-filter').getByPlaceholder('Age').clear()
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)
        await page.waitForTimeout(500)

        const ageRows = page.locator('tbody tr')
        for (let row of await ageRows.all()){
            const cellValue = await row.locator('td').last().textContent()
            if(age == "200"){
                expect(await page.getByRole('table').textContent()).toContain(' No data found ')

            }else{
                expect(cellValue).toEqual(age)
            }

            
        }
    }
    


})

// date picker
test('datepicker', async({ page }) =>{
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const calendarInputField = page.getByPlaceholder('Form Picker')
    await calendarInputField.click()

    let date = new Date()
   

    await page.locator('[class="day-cell ng-star-inserted"]').getByText('1', {exact: true}).click()
    await expect(calendarInputField).toHaveValue('Nov 1, 2024')
})

test('sliders',async ({ page }) => {

    const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
    await tempGauge.evaluate( node => {
        node.setAttribute('cx', '232.60')
        node.setAttribute('cy', '232.60')
    })
    await tempGauge.click()

    // mouse movement
    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
    await tempBox.scrollIntoViewIfNeeded()

    const box = await tempBox.boundingBox()

    // const x = box?.x + box?.width 
    // const y = box.y + box.height / 2


})