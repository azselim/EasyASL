![image](https://github.com/user-attachments/assets/40161a3b-c036-4ccd-b800-51105b7d8c92)


# Inspiration
We were inspired by the fact that diversity in disability is often overlooked - individuals who are hard-of-hearing or deaf and use American Sign Language do not have many tools that support them in learning their language. Because of the visual nature of ASL, it's difficult to translate between it and written languages, so many forms of language software, whether it is for education or translation, do not support ASL. We wanted to provide a way for ASL-speakers to be supported in learning and speaking their language. Additionally, we were inspired by recent news stories about fake ASL interpreters - individuals who defrauded companies and even government agencies to be hired as ASL interpreters, only to be later revealed as frauds. Rather than accurately translate spoken English, they 'signed' random symbols that prevented the hard-of-hearing community from being able to access crucial information. We realized that it was too easy for individuals to claim their competence in ASL without actually being verified. All of this inspired the idea of EasyASL - a web app that helps you learn ASL vocabulary, translate between spoken English and ASL, and get certified in ASL.

# What it does
EasyASL provides three key functionalities: learning, certifying, and translating. 

Learning: We created an ASL library - individuals who are learning ASL can type in the vocabulary word they want to learn to see a series of images or a GIF demonstrating the motions required to sign the word. Current ASL dictionaries lack this dynamic ability, so our platform lowers the barriers in learning ASL, allowing more members from both the hard-of-hearing community and the general population to improve their skills.

Certifying: Individuals can get their mastery of ASL certified by taking a test on EasyASL. Once they start the test, a random word will appear on the screen and the individual must sign the word in ASL within 5 seconds. Their movements are captured by their webcam, and these images are run through OpenAI's API to check what they signed. If the user is able to sign a majority of the words correctly, they will be issued a unique certificate ID that can certify their mastery of ASL. This certificate can be verified by prospective employers, helping them choose trustworthy candidates.

Translating: EasyASL supports three forms of translation: translating from spoken English to text, translating from ASL to spoken English, and translating in both directions. EasyASL aims to make conversations between ASL-speakers and English-speakers more fluid and natural.

# How we built it
EasyASL was built primarily with typescript and next.js. We captured images using the user's webcam, then processed the images to reduce the file size while maintaining quality. Then, we ran the images through OpenAI's API, which was trained to recognize the ASL signs and identify the word being signed. This was used in both our certification stream, where the user's ASL sign was compared against the prompt they were given, and in the translation stream, where ASL phrases were written as a transcript then read aloud in real time. We also used Google's web speech API in the translation stream, which converted English to written text. Finally, the education stream's dictionary was built using typescript and a directory of open-source web images.

# Challenges we ran into
We faced many challenges while working on EasyASL, but we were able to persist through them to come to our finished product. One of our biggest challenges was working with OpenAI's API: we only had a set number of tokens, which were used each time we ran the program, meaning we couldn't test the program too many times. Also, many of our team members were using TypeScript and Next.js for the first time - though there was a bit of a learning curve, we found that its similarities with JavaScript helped us adapt to the new language. Finally, we were originally converting our images to a UTF-8 string, but got strings that were over 500,000 characters long, making them difficult to store. We were able to find a workaround by keeping the images as URLs and passing these URLs directly into our functions instead.

# Accomplishments that we're proud of
We were very proud to be able to integrate APIs into our project. We learned how to use them in different languages, including TypeScript. By integrating various APIs, we were able to streamline processes, improve functionality, and deliver a more dynamic user experience. Additionally, we were able to see how tools like AI and text-to-speech could have real-world applications.

# What we learned
We learned a lot about using Git to work collaboratively and resolve conflicts like separate branches or merge conflicts. We also learned to use Next.js to expand what we could do beyond JavaScript and HTML/CSS. Finally, we learned to use APIs like Open AI API and Google Web Speech API.

# What's next for EasyASL
We'd like to continue developing EasyASL and potentially replacing the Open AI framework with a neural network model that we would train ourselves. Currently processing inputs via API has token limits reached quickly due to the character count of Base64 converted image. This results in a noticeable delay between image capture and model output. By implementing our own model, we hope to speed this process up to recreate natural language flow more readily. We'd also like to continue to improve the UI/UX experience by updating our web app interface. Finally, we're considering adding translation to other sign languages to expand EasyASL to a global audience.

# Other Links & Achievements
Devpost (Demos and team contributions): https://devpost.com/software/easyasl?ref_content=my-projects-tab&ref_feature=my_projects

### EasyASL was submitted to Hack the Valley 9 and won Best Beginner Hack! (Best submission by first-year students or younger)
