import React from "react";
import "../components/Footer.css";
import { Button, Form, FormField, TextInput, Box } from "grommet";

const Footer = () => {
    return (
        <footer class="footer-container">
            <div class="container">
                <div class="footer-data-container">
                    <address>
                        <div class="footer-title-container">
                            <img src="https://cdn-icons-png.flaticon.com/512/3790/3790699.png" alt="logo" className="footer-logo" />
                            <a href="./index.html" class="footer-title">Pay<span>Ments</span></a>
                        </div>
                            <ul class="address-list">
                                <li><a href="https://goo.gl/maps/1e7vazAhMQn9W81JA" id="footer-adress">California, CA, La Habra, 4105 Pin Oak Drive</a></li>
                                <li><a href="mailto:info@payments.com">info@payments.com</a></li>
                                <li><a href="tel:+380001110011">+38 000 111 00 11</a></li>
                            </ul>
                    </address>
                    <div class="social-container">
                        <p>Follow us</p>
                        <ul class="social-contact-list">
                            <li><a href="https://www.instagram.com/"><img src="https://cdn-icons-png.flaticon.com/512/3670/3670125.png" alt="instagram" /></a></li>
                            <li><a href="https://uk.linkedin.com/"><img src="https://cdn-icons-png.flaticon.com/512/3670/3670129.png" alt="linkedin" /></a></li>
                            <li><a href="https://github.com/Ukrainian-Bug-Hunters"><img src="https://cdn-icons-png.flaticon.com/512/4494/4494756.png" alt="github" /></a></li>
                        </ul>
                    </div>
                    <Form onSubmit={({ value }) => {}}>
                        <FormField name="name" htmlFor="textinput-id" label="To contact our Support-Team write your e-mail" class="sup-input">
                            <TextInput id="textinput-id" name="name" />
                        </FormField>
                        <Box direction="row" gap="medium">
                            <Button type="submit" primary label="Submit" />
                            <Button type="reset" label="Reset"/>
                        </Box>
                    </Form>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
