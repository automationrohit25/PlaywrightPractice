import { Page } from "@playwright/test"

export class FormLayoutPage {

    private readonly page: Page

    constructor(page: Page){

        this.page = page
    }

    async submitUsingTheGridormWithCredentialsandSelectOptions(email: string, password: string, optionText: string){
        const usingTheGridForm = this.page.locator('nb-card', {hasText:"Using the Grid"})
        await usingTheGridForm.getByRole('textbox', {name: "Email" }).fill(email)
        await usingTheGridForm.getByRole('textbox', {name: "Password" }).fill(password)
        await usingTheGridForm.getByRole('radio', {name: optionText}).check({ force: true})
        await usingTheGridForm.getByRole('button').click()

    }

    /**
     * 
     * @param name 
     * @param email 
     * @param rememberMe 
     */

    async submitInLineFormWithNameEmailAndCheckbox(name: string, email: string, rememberMe: boolean){
        const inLineForm = this.page.locator('nb-card', {hasText:"Inline form"})
        await inLineForm.getByRole('textbox', { name: "Jane Doe"}).fill(name)
        await inLineForm.getByRole('textbox', { name: "Email"}).fill(email)
        if(rememberMe)
            await inLineForm.getByRole('checkbox').check({force: true})
        await inLineForm.getByRole('button').click()


    }

}