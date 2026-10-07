# BSA Questionnaire APIs

# Overview — When to Call These APIs

When a transaction is placed **on BSA HOLD**, UniTeller sends a webhook event to the partner indicating that additional user information and supporting documents are required before the transaction can be processed further.

Upon receiving this webhook event, the partner must call the Questionnaire APIs described in this section to retrieve the required questions. The partner can then display these questions to the user, collect the required responses and supporting documents, and submit the information to UniTeller using the applicable Questionnaire APIs.

| **Step** | **API** | **Purpose** |
| --- | --- | --- |
| 1 | GetQuestionnaire ([Refer to Section 5.26](#526-getquestionnaire-requires-password-grant)) | Fetches the questionnaire group, including all questions and required supporting documents applicable to the **transaction on which BSA HOLD has been applied**. |
| 2 | SubmitQuestionnaireAnswers ([Refer to Section 5.27](#527-submitquestionnaireanswers-requires-password-grant)) | Submit the answers and supporting documents provided by the user. **Use actionType = SAVE** to save the answers for later modification, and **actionType = SUBMIT** to finally submit them. |

*Once the answers are finally submitted **(actionType = SUBMIT)**, the submitted information is reviewed and the transaction proceeds through the applicable BSA review process. The status of each answered question is updated accordingly, as described in the Question Status Lifecycle section.*

# 5.26 GetQuestionnaire (Requires Password Grant)

**Description:** This API is used to fetch a single questionnaire group, including all its questions and required documents, for a user to complete. The API is called when a transactional webhook event is received for the user indicating that BSA documents are required.

**URI (GET):**

**{{baseURL}}/UTLROnlineRemitAPI/questionnaire/BSA_DOCUMENT?projectionType=Transaction&applicationId={REMITTER}**

**Possible Response Code:** [00000000,19904006] (See [Appendix C](#appendix-c) for Response Code details.)

## **UNIR Request Header:**

| **Attribute** | **Validation Rule** | **Description** | **Type** |
| --- | --- | --- | --- |
| Accept-Language | Mandatory | Display language of question details. Valid values are ES (Spanish) or EN (English). | String |

## **UNIR Request Param:**

| **Attribute** | **Validation Rule** | **Description** | **Type** |
| --- | --- | --- | --- |
| projectionType | Mandatory | Specifies the context for which the questionnaire is being requested. **Possible value:** Transaction. | String |
| applicationId | Mandatory | Specifies the identifier associated with the questionnaire request. **Possible value:** REMITTER. | String |

## **UNIR Response:** Response

| **Attribute** | **Description** | **Type** |
| --- | --- | --- |
| responseCode | Returns Response Code | String |
| responseMessage | Return Response Message | String |
| errors | Contains a list of error details when one or more errors occur while processing the request. Returns null when no errors are present. | Array of errors |
| questionsGroup | Contains the list of questionnaire details. | Array of [Questions Group](#questions-group). See [Appendix A](#appendix-a) |
| tokenStatus | Reserved for future use. This field is currently not applicable and may be used in future versions. | String |
| applicationId | The application identifier for which the questionnaire was fetched. This is the transaction number when the questionnaire is fetched against a transaction, and is the same value that was supplied in the applicationId request parameter. | String |

**Sample JSON Request**

```text
{{baseURL}}/UTLROnlineRemitAPI/questionnaire/BSA_DOCUMENT?projectionType=Transaction&applicationId=REMITTER
```

**Sample JSON Response**

```text
{"responseCode":"00000000","responseMessage":"success","errors":null,"applicationId":"71096153SF","tokenStatus":null,"questionsGroup":[{"groupId":"GROUP_1","group":"Complete BSA File Information","groupDesc":"Complete BSA File Information","questions":[{"questionId":"QUESTION_1","question":"Social Security Number","answerType":"SecureText","isMandatory":"TRUE","allowedContentTypes":["text"],"answerOptions":[],"dependency":{"dependentQuestionId":null,"dependentOptions":null},"allowedContentSize":{"min":"1","max":"60","unit":"CHAR"},"status":"APPROVED","description":null,"placeHolder":null,"hintMessage":"Social Security Number that is confidential","regex":"^[a-zA-Z0-9]{1,60}$","regexValMessage":"Social Security Number shold be 1 to 60","maskFormat":null},{"questionId":"QUESTION_1","question":"Social Security Number","answerType":"SecureText","isMandatory":"TRUE","allowedContentTypes":["text"],"answerOptions":[],"dependency":{"dependentQuestionId":null,"dependentOptions":null},"allowedContentSize":{"min":"1","max":"60","unit":"CHAR"},"status":"APPROVED","description":null,"placeHolder":null,"hintMessage":"Social Security Number that is confidential","regex":"^[a-zA-Z0-9]{1,60}$","regexValMessage":"Social Security Number shold be 1 to 60","maskFormat":null},{"questionId":"QUESTION_1","question":"Social Security Number","answerType":"SecureText","isMandatory":"TRUE","allowedContentTypes":["text"],"answerOptions":[],"dependency":{"dependentQuestionId":null,"dependentOptions":null},"allowedContentSize":{"min":"1","max":"60","unit":"CHAR"},"status":"APPROVED","description":null,"placeHolder":null,"hintMessage":"Social Security Number that is confidential","regex":"^[a-zA-Z0-9]{1,60}$","regexValMessage":"Social Security Number shold be 1 to 60","maskFormat":null},{"questionId":"QUESTION_1","question":"Social Security Number","answerType":"SecureText","isMandatory":"TRUE","allowedContentTypes":["text"],"answerOptions":[],"dependency":{"dependentQuestionId":null,"dependentOptions":null},"allowedContentSize":{"min":"1","max":"60","unit":"CHAR"},"status":"APPROVED","description":null,"placeHolder":null,"hintMessage":"Social Security Number that is confidential","regex":"^[a-zA-Z0-9]{1,60}$","regexValMessage":"Social Security Number shold be 1 to 60","maskFormat":null},{"questionId":"QUESTION_1","question":"Social Security Number","answerType":"SecureText","isMandatory":"TRUE","allowedContentTypes":["text"],"answerOptions":[],"dependency":{"dependentQuestionId":null,"dependentOptions":null},"allowedContentSize":{"min":"1","max":"60","unit":"CHAR"},"status":"APPROVED","description":null,"placeHolder":null,"hintMessage":"Social Security Number that is confidential","regex":"^[a-zA-Z0-9]{1,60}$","regexValMessage":"Social Security Number shold be 1 to 60","maskFormat":null},{"questionId":"QUESTION_1","question":"Social Security Number","answerType":"SecureText","isMandatory":"TRUE","allowedContentTypes":["text"],"answerOptions":[],"dependency":{"dependentQuestionId":null,"dependentOptions":null},"allowedContentSize":{"min":"1","max":"60","unit":"CHAR"},"status":"APPROVED","description":null,"placeHolder":null,"hintMessage":"Social Security Number that is confidential","regex":"^[a-zA-Z0-9]{1,60}$","regexValMessage":"Social Security Number shold be 1 to 60","maskFormat":null},{"questionId":"QUESTION_1","question":"Social Security Number","answerType":"SecureText","isMandatory":"TRUE","allowedContentTypes":["text"],"answerOptions":[],"dependency":{"dependentQuestionId":null,"dependentOptions":null},"allowedContentSize":{"min":"1","max":"60","unit":"CHAR"},"status":"APPROVED","description":null,"placeHolder":null,"hintMessage":"Social Security Number that is confidential","regex":"^[a-zA-Z0-9]{1,60}$","regexValMessage":"Social Security Number shold be 1 to 60","maskFormat":null},{"questionId":"QUESTION_1","question":"Social Security Number","answerType":"SecureText","isMandatory":"TRUE","allowedContentTypes":["text"],"answerOptions":[],"dependency":{"dependentQuestionId":null,"dependentOptions":null},"allowedContentSize":{"min":"1","max":"60","unit":"CHAR"},"status":"APPROVED","description":null,"placeHolder":null,"hintMessage":"Social Security Number that is confidential","regex":"^[a-zA-Z0-9]{1,60}$","regexValMessage":"Social Security Number shold be 1 to 60","maskFormat":null},{"questionId":"QUESTION_1","question":"Social Security Number","answerType":"SecureText","isMandatory":"TRUE","allowedContentTypes":["text"],"answerOptions":[],"dependency":{"dependentQuestionId":null,"dependentOptions":null},"allowedContentSize":{"min":"1","max":"60","unit":"CHAR"},"status":"APPROVED","description":null,"placeHolder":null,"hintMessage":"Social Security Number that is confidential","regex":"^[a-zA-Z0-9]{1,60}$","regexValMessage":"Social Security Number shold be 1 to 60","maskFormat":null},{"questionId":"QUESTION_2","question":"Occupation","answerType":"Text","isMandatory":"TRUE","allowedContentTypes":["text"],"answerOptions":[],"dependency":{"dependentQuestionId":null,"dependentOptions":null},"allowedContentSize":{"min":"1","max":"60","unit":"CHAR"},"status":"ASKED","description":null,"placeHolder":null,"hintMessage":null,"regex":"^[a-zA-Z0-9]{1,60}$","regexValMessage":null,"maskFormat":null},{"questionId":"QUESTION_3","question":"Employer Name","answerType":"Text","isMandatory":"TRUE","allowedContentTypes":["text"],"answerOptions":[],"dependency":{"dependentQuestionId":null,"dependentOptions":null},"allowedContentSize":{"min":"1","max":"60","unit":"CHAR"},"status":"ASKED","description":null,"placeHolder":null,"hintMessage":null,"regex":"^[a-zA-Z0-9]{1,60}$","regexValMessage":null,"maskFormat":null},{"questionId":"QUESTION_4","question":"Employer Phone Number","answerType":"Text","isMandatory":"TRUE","allowedContentTypes":["text"],"answerOptions":[],"dependency":{"dependentQuestionId":null,"dependentOptions":null},"allowedContentSize":{"min":"1","max":"60","unit":"CHAR"},"status":"ASKED","description":null,"placeHolder":"xxx-xxx-xxxx\n","hintMessage":null,"regex":"^[a-zA-Z0-9]{1,60}$","regexValMessage":null,"maskFormat":"999-999-9999"},{"questionId":"QUESTION_5","question":"Purpose Of Transfer","answerType":"Text","isMandatory":"TRUE","allowedContentTypes":["text"],"answerOptions":[],"dependency":{"dependentQuestionId":null,"dependentOptions":null},"allowedContentSize":{"min":"1","max":"60","unit":"CHAR"},"status":"ASKED","description":null,"placeHolder":null,"hintMessage":null,"regex":"^[a-zA-Z0-9]{1,60}$","regexValMessage":null,"maskFormat":null}]},{"groupId":"GROUP_2","group":"Upload your photo Id","groupDesc":"upload image descriptin ","questions":[{"questionId":"QUESTION_6","question":"Select id type you are uploading","answerType":"DropDown","isMandatory":"TRUE","allowedContentTypes":null,"answerOptions":[{"optionId":"SELECT","option":"--Select--"},{"optionId":"PASSPORT","option":"Passport"},{"optionId":"DRIVER_LICENSE","option":"Driver License"},{"optionId":"OTHER","option":"Other"}],"dependency":{"dependentQuestionId":null,"dependentOptions":null},"allowedContentSize":{"min":"1","max":"1000","unit":"KB"},"status":"ASKED","description":null,"placeHolder":null,"hintMessage":null,"regex":null,"regexValMessage":null,"maskFormat":null},{"questionId":"DOCUMENT_1","question":"Front Image","answerType":"File","isMandatory":"TRUE","allowedContentTypes":["image/jpeg","image/png","application/pdf"],"answerOptions":[],"dependency":{"dependentQuestionId":"QUESTION_6","dependentOptions":"DRIVER_LICENSE"},"allowedContentSize":{"min":"1","max":"1000","unit":"KB"},"status":"ASKED","description":null,"placeHolder":null,"hintMessage":null,"regex":null,"regexValMessage":null,"maskFormat":null},{"questionId":"DOCUMENT_2","question":"Back Image","answerType":"File","isMandatory":"TRUE","allowedContentTypes":["image/jpeg","image/png","application/pdf"],"answerOptions":[],"dependency":{"dependentQuestionId":"QUESTION_6","dependentOptions":"DRIVER_LICENSE"},"allowedContentSize":{"min":"1","max":"1000","unit":"KB"},"status":"ASKED","description":null,"placeHolder":null,"hintMessage":null,"regex":null,"regexValMessage":null,"maskFormat":null},{"questionId":"QUESTION_7","question":"Select driver licesnse state","answerType":"DropDown","isMandatory":"TRUE","allowedContentTypes":["text"],"answerOptions":[{"optionId":"SELECT","option":"--Select--"},{"optionId":"AR","option":"AR"},{"optionId":"NJ","option":"NJ"}],"dependency":{"dependentQuestionId":"QUESTION_6","dependentOptions":"DRIVER_LICENSE"},"allowedContentSize":{"min":"1","max":"60","unit":"CHAR"},"status":"ASKED","description":null,"placeHolder":null,"hintMessage":null,"regex":"^[a-zA-Z0-9]{1,60}$","regexValMessage":null,"maskFormat":null},{"questionId":"DOCUMENT_3","question":"Front Image","answerType":"File","isMandatory":"TRUE","allowedContentTypes":["image/jpeg","image/png","application/pdf"],"answerOptions":[],"dependency":{"dependentQuestionId":"QUESTION_6","dependentOptions":"PASSPORT"},"allowedContentSize":{"min":"1","max":"60","unit":"CHAR"},"status":"ASKED","description":null,"placeHolder":null,"hintMessage":null,"regex":"^[a-zA-Z0-9]{1,60}$","regexValMessage":null,"maskFormat":null},{"questionId":"QUESTION_9","question":"Passport","answerType":"Text","isMandatory":"TRUE","allowedContentTypes":["text"],"answerOptions":[],"dependency":{"dependentQuestionId":"QUESTION_6","dependentOptions":"PASSPORT"},"allowedContentSize":{"min":"1","max":"60","unit":"CHAR"},"status":"ASKED","description":null,"placeHolder":null,"hintMessage":null,"regex":"^[a-zA-Z0-9]{1,60}$","regexValMessage":null,"maskFormat":null},{"questionId":"QUESTION_8","question":"DL number","answerType":"Text","isMandatory":"TRUE","allowedContentTypes":["text"],"answerOptions":[],"dependency":{"dependentQuestionId":"QUESTION_6","dependentOptions":"DRIVER_LICENSE"},"allowedContentSize":{"min":"1","max":"60","unit":"CHAR"},"status":"ASKED","description":null,"placeHolder":null,"hintMessage":null,"regex":"^[a-zA-Z0-9]{1,60}$","regexValMessage":null,"maskFormat":null}]}]}
```

# 5.27 SubmitQuestionnaireAnswers (Requires Password Grant)

**Description:** This API is used to submit the user's responses to the questionnaire. Text responses and supporting documents can be submitted together using multipart form-data.

**URI (POST):**

**{{baseURL}}/UTLROnlineRemitAPI/questionnaire/BSA_DOCUMENT/answers**

**Content-Type:** multipart/form-data

**Possible Response Code:** [00000000,19903009] (See [Appendix C](#appendix-c) for Response Code details.)

**UNIR Request Body (form-data):**

| **Attribute** | **Validation Rule** | **Description** | **Type** |
| --- | --- | --- | --- |
| actionType | Mandatory. Possible values are [SAVE, SUBMIT]. | Action to be performed on the questionnaire answers. **SAVE**: saves the supplied answers without final submission and updates the status of the answered questions from **ASKED** to **SAVED**. Answers can still be modified and posted again. **SUBMIT**: finally submits the answers and updates the status of the answered text questions to **APPROVED** and document questions to **PENDING** until its reviewed. Once submitted, the answers cannot be submitted again for the same token. | String |
| applicationId | Mandatory | Application Id of the questionnaire session for which answers are being submitted, as received in the GetQuestionnaire response. | String |
| projectionType | Mandatory | Indicates the projection context of the questionnaire (e.g. Transaction). | String |
| Dynamic Question Key | Conditional | The key is dynamically provided in the **Get Questionnaire** API response based on the question or field requirement. The corresponding answer value must be provided using the same key in the request body. This key is not restricted to a fixed format such as **QUESTION_1**; it may vary based on the questionnaire configuration (e.g., **QUESTION_1**, **COUNTRY_LIST_ID**, etc.). Required when the corresponding question or field is mandatory. | String |
| Dynamic Document Key | Conditional | The key is dynamically provided in the **Get Questionnaire** API response for file-based questions. The corresponding file or existing document token must be provided using the same key in the request body. Required when the corresponding document question is mandatory. | File / String |

***Note:** The request body uses dynamic keys based on the questionnaire configuration. The key for each question or field is provided in the **Get Questionnaire** API response. The same key must be used in the request body to provide the corresponding answer or document. The key format is not fixed and may vary depending on the question or field requirement.*

## **UNIR Response:** Response

| **Attribute** | **Description** | **Type** |
| --- | --- | --- |
| responseCode | Returns Response Code. | String |
| responseMessage | Return Response Message. | String |
| errors | If any error occurs while processing the request, error details are returned here. Returns null when there is no error. | Array of errors |

**Sample JSON Response - Success**

```text
{
    "responseCode": "00000000",
    "responseMessage": "success",
    "errors": null
}
```

**Sample JSON Response â€“ Duplicate Submit**

```text
{
    "responseCode": "19903009",
    "responseMessage": "answer already submit for token",
    "errors": null
}
```

# Appendix 'A'

# Questions Group

| **Attribute** | **Description** | **Type** |
| --- | --- | --- |
| groupId | Unique identifier of the question group of the list (e.g. **GROUP_1**, **GROUP_2**). | String |
| group | Display name / title of the question group. | String |
| groupDesc | Description of the question group shown to the user. | String |
| questions | List of questions and documents belonging to this group. | Array of [Question](#questions) objects |

## Questions

| **Attribute** | **Description** | **Type** |
| --- | --- | --- |
| questionId | Unique identifier of the question. | String |
| question | Text of the question to be displayed to the user. | String |
| answerType | Specifies the type of response expected for the question, such as File, **DropDown**, **Text**, or **SecureText**. For **SecureText**, the answer should be masked when entered by the user. | String |
| answerOptions | List of options available for selection when the question requires predefined answer choices. | Array of [AnswerOptions](#answer-options) |
| isMandatory | Indicates whether the user is required to provide an answer to the question. | String |
| dependency | Specifies whether the question is displayed based on the answer provided to another question. Contains the dependencyQuestionId and dependencyOption used to determine the dependency. | Object of [dependency](#dependency) |
| allowedContentTypes | Specifies the file or content types permitted when the answer type is File, such as text, jpeg, png, or pdf. | Object of [allowedContentTypes](#allowedcontenttypes) |
| allowedContentSize | Specifies the permitted content size limits. Contains min, max, and unit values. | Object of [allowedContentSize](#allowedcontentsize) |
| status | Indicates the current status of the question in the questionnaire lifecycle. Possible values are **ASKED**, **SAVED**, **APPROVED** and **PENDING**. See the **Question Status Lifecycle** section for details in [Appendix B](#appendix-b) | String |
| placeHolder | Specifies the placeholder text to be displayed in the input field. | String |
| description | Provides additional information or instructions related to the question, if applicable. | String |
| hintMessage | Provides a hint or guidance message to assist the user in providing the required answer. | String |
| regex | Specifies the regular expression pattern to be used for validating the user's input. | String |
| regexValMessage | Specifies the message to be displayed when the user's input does not satisfy the defined validation pattern. | String |
| maskFormat | Specifies the input masking format to be applied to the user's response, if applicable. | String |

# Answer Options

| **Attribute** | **Description** | **Type** |
| --- | --- | --- |
| optionId | Unique identifier of the answer option. | String |
| option | Text of the answer option to be displayed to the user. | String |

# Dependency

| **Attribute** | **Description** | **Type** |
| --- | --- | --- |
| dependentQuestionId | Identifies the question on which the current question depends. | String |
| dependentOptions | Specifies the answer option values for which the dependent question should be displayed. | Array of String |

# AllowedContentSize

| **Attribute** | **Description** | **Type** |
| --- | --- | --- |
| min | Specifies the minimum allowed size of the content or file. | String |
| max | Specifies the maximum allowed size of the content or file. | String |
| unit | Specifies the unit used for the content size, such as KB or MB. | String |

# AllowedContentTypes

| **Attribute** | **Description** | **Type** |
| --- | --- | --- |
| allowedContentTypes | Specifies the content or file types accepted for the question. Examples include image/jpeg, image/png, application/pdf, and text. | Array of String |

# Appendix 'B'

## Question Status Lifecycle

The status attribute returned against each question reflects the stage of that question in the questionnaire lifecycle. It is updated by the SubmitQuestionnaireAnswers API ([Section 5.27](#527-submitquestionnaireanswers-requires-password-grant)) based on the **actionType** supplied in the request.

| **Status** | **When it is returned** | **Set by** |
| --- | --- | --- |
| ASKED | The question has been asked to the user but no answer has been submitted yet. This is the initial status returned by the GetQuestionnaire API before any answer is posted. | Initial state |
| SAVED | The answer has been saved against the question but has not been finally submitted. The user can still update the answer and post again. | **actionType** = SAVE |
| APPROVED | The answer has been finally submitted and approved against the question. No further submission is allowed for the same token. | **actionType** = SUBMIT |
| PENDING | Applicable to document-based questions when the associated document has been submitted but is still pending processing or review. | **actionType** = SUBMIT |

*Note: A question returned with status **APPROVED** has already been answered and submitted. For document-based questions, the status may remain **PENDING** after submission until the document is processed or reviewed. Re-submitting answers for a question that is already **APPROVED** for the same token returns response code **19903009** (answer already submitted for token).*

# Appendix 'C'

| **ErrorCode** | **Failure Type** | **Description** |
| --- | --- | --- |
| 00000000 | success | This response code is returned if desired response is returned. |
| 19903009 | answer already submit for token | The answers have already been finally submitted against this token. A duplicate submission is not allowed. |
| 19904006 | No token available | No BSA questionnaire is available for the user because no questions have been configured or posted by the administrator for the applicable transaction. |
| 10104007 | invalid_token | The user's access token is invalid or has expired. The user must obtain a new access token and retry the request. |
| 19903009 | invalid input | The input provided is invalid. The value may not meet the required length or expected input type/format. |