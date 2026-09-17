const evil = document.getElementById('evil');
const safe = document.getElementById('safe');
const result = document.getElementById('result');

const OFFSET = 10;
const JUMP_DISTANCE = 150;

// Place the evil button at its starting spot (next to the safe button) on load
window.addEventListener('load', () => {
    const safeBox = safe.getBoundingClientRect();
    evil.style.left = `${safeBox.right + 16}px`;
    evil.style.top = `${safeBox.top}px`;
});

// The "safe" button behaves like a normal button
safe.addEventListener('click', () => {
    result.textContent = "Thankyou <3";
});

// If someone actually manages to click the evil button
evil.addEventListener('click', () => {
    result.textContent = "Wait, how did you catch that?! Respect.";
});

// Move the evil button away whenever the mouse gets close
document.addEventListener('mousemove', (e) => {
    const x = e.pageX;
    const y = e.pageY;
    const buttonBox = evil.getBoundingClientRect();

    const horizontalDistance = distanceFromCenter(buttonBox.x, x, buttonBox.width);
    const verticalDistance = distanceFromCenter(buttonBox.y, y, buttonBox.height);

    const horizontalOffset = buttonBox.width / 2 + OFFSET;
    const verticalOffset = buttonBox.height / 2 + OFFSET;

    if (Math.abs(horizontalDistance) <= horizontalOffset && Math.abs(verticalDistance) <= verticalOffset) {
        // Jump in the opposite direction of the cursor, using sign() to avoid
        // division-by-zero when the cursor passes exactly through the center
        const dirX = horizontalDistance === 0 ? 1 : Math.sign(horizontalDistance);
        const dirY = verticalDistance === 0 ? 1 : Math.sign(verticalDistance);

        setButtonPosition(
            buttonBox.x - dirX * JUMP_DISTANCE,
            buttonBox.y - dirY * JUMP_DISTANCE
        );
    }
});

function setButtonPosition(left, top) {
    const buttonBox = evil.getBoundingClientRect();
    const maxLeft = window.innerWidth - buttonBox.width - OFFSET;
    const maxTop = window.innerHeight - buttonBox.height - OFFSET;

    // Keep the button fully inside the viewport
    left = Math.min(Math.max(left, OFFSET), maxLeft);
    top = Math.min(Math.max(top, OFFSET), maxTop);

    evil.style.left = `${left}px`;
    evil.style.top = `${top}px`;
}

function distanceFromCenter(boxPosition, mousePosition, boxSize) {
    return boxPosition - mousePosition + boxSize / 2;
}
