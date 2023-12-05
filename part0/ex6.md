```mermaid
sequenceDiagram
    participant browser
    participant server
    
	Note right of browser: The browser rerenders the notes after the click on submit,<br>then send the note to server while e spa.js
	
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: 201 Created - New resource (application/json) has been created
    deactivate server
    
```

