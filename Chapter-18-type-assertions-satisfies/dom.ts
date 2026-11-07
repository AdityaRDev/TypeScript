// Get HTML elements using Type Assertions

const input = document.getElementById(
    "username"
) as HTMLInputElement;

const button = document.getElementById(
    "submitBtn"
) as HTMLButtonElement;

const result = document.getElementById(
    "result"
) as HTMLHeadingElement;


// Add button click event

button.addEventListener("click", () => {

    const username = input.value.trim();

    if (username === "") {
        result.textContent = "Please enter your name!";
        return;
    }

    result.textContent = `Welcome, ${username}!`;

    console.log("Username:", username);
});