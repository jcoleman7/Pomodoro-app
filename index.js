const pomodoro = document.getElementById("pomodoro");
        const shortBreak = document.getElementById("shortBreak");
        const longBreak = document.getElementById("longBreak");
        const timerDisplay = document.getElementById("timerDisplay");
        const start = document.getElementById("start");

        let timerInterval;
        let secondsRemaining = 25 * 60;  // default to 25 minutes (Pomodoro)

        // Format time in MM:SS
        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const secondsLeft = seconds % 60;
            return `${minutes < 10 ? '0' : ''}${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
        }

        // Function to start the timer
        function startTimer() {
            if (timerInterval) clearInterval(timerInterval);
            timerInterval = setInterval(() => {
                secondsRemaining--;
                timerDisplay.innerText = formatTime(secondsRemaining);

                // When the timer hits 0, stop the interval and utter the speech
                if (secondsRemaining <= 0) {
                    clearInterval(timerInterval);
                    speak("Time's up!");
                    alert("Time's up!");  // Optional alert as well
                }
            }, 1000);
        }

        // Function to handle speech synthesis
        function speak(message) {
            const utterance = new SpeechSynthesisUtterance(message);
            speechSynthesis.speak(utterance);
        }

        // Set timer for Pomodoro
        function setPomodoro() {
            pomodoro.addEventListener("click", () => {
                secondsRemaining = 25 * 60;  // 25 minutes
                timerDisplay.innerText = formatTime(secondsRemaining);
            });
        }

        // Set timer for Short Break
        function setShortBreak() {
            shortBreak.addEventListener("click", () => {
                secondsRemaining = 5 * 60;  // 5 minutes
                timerDisplay.innerText = formatTime(secondsRemaining);
            });
        }

        // Set timer for Long Break
        function setLongBreak() {
            longBreak.addEventListener("click", () => {
                secondsRemaining = 15 * 60;  // 15 minutes
                timerDisplay.innerText = formatTime(secondsRemaining);
            });
        }

        // Toggle Start and Pause
        function toggleTimer() {
            if (start.innerText === "Start") {
                start.innerText = "Pause";
                startTimer();
            } else {
                clearInterval(timerInterval);
                start.innerText = "Start";
            }
        }

        start.addEventListener("click", toggleTimer);

        setPomodoro();
        setShortBreak();
        setLongBreak();
