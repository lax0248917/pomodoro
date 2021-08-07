const pomoDurationInput = document.querySelector("#timer-input");
const startButton = document.querySelector("#btn-start");
const pauseButton = document.querySelector("#btn-pause");
const resetButton = document.querySelector("#btn-reset");

// I like the thought of using a class for the timer, lets code that up
class Timer {
  constructor(
    pomoDurationInput,
    startButton,
    pauseButton,
    resetButton,
    callbacks
  ) {
    this.pomoDurationInput = pomoDurationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    this.resetButton = resetButton;
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onComplete = callbacks.onComplete;
    }

    this.startButton.addEventListener("click", this.start);
    this.pauseButton.addEventListener("click", this.pause);
    this.resetButton.addEventListener("click", this.reset);
  }

  start = () => {
    if (this.onStart) {
      this.onStart(this.timeRemaining);
    }
    this.tick();
    this.interval = setInterval(this.tick, 100);
  };

  pause = () => {
    clearInterval(this.interval);
  };

  reset = () => {
    clearInterval(this.interval);
    // clear input
  };

  tick = () => {
    if (this.timeRemaining <= 0) {
      this.pause();
      if (this.onComplete) {
        this.onComplete;
      }
    } else {
      this.timeRemaining = this.timeRemaining - 0.2;
    }
  };

  get timeRemaining() {
    return parseFloat(this.pomoDurationInput.value);
  }

  set timeRemaining(time) {
    this.pomoDurationInput.value = time.toFixed(2);
  }
}

let duration;
const timer = new Timer(
  pomoDurationInput,
  startButton,
  pauseButton,
  resetButton,
  {
    onStart(totalDuration) {
      duration = totalDuration;
    },
    onComplete() {
      console.log("Time is completed");
    },
  }
);
