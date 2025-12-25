jQuery(document).ready(function ($) {

  let currentIndex = 0;
  let timer;
  let timeLeft = 10;
  let questions = [];
  let score = 0;
  let totalQuestions = 15;

  const quizBank = {

    easy: {
      time: 5,
      questions: [
        { q: "What is WordPress?", options: ["Database", "CMS", "OS"], correct: 1 },
        { q: "WordPress uses which language?", options: ["PHP", "Java", "Python"], correct: 0 },
        { q: "WordPress is free?", options: ["Yes", "No", "Paid"], correct: 0 },
        { q: "Themes control?", options: ["Design", "Server", "DB"], correct: 0 },
        { q: "Plugins add?", options: ["Features", "Errors", "Hosting"], correct: 0 }
      ]
        
    },

    medium: {
      time: 5,
      questions: [
        { q: "Which file loads WordPress?", options: ["wp-load.php", "index.php", "config.php"], correct: 0 },
        { q: "Which table stores posts?", options: ["wp_posts", "wp_users", "wp_meta"], correct: 0 },
        { q: "Which hook runs first?", options: ["init", "wp_loaded", "plugins_loaded"], correct: 2 },
        { q: "Which editor is default?", options: ["Classic", "Gutenberg", "TinyMCE"], correct: 1 },
        { q: "WordPress is written in?", options: ["PHP", "NodeJS", "Python"], correct: 0 }
        
      ]
    },

    hard: {
      time: 15,
      questions: [
        { q: "Which function runs DB queries?", options: ["wpdb()", "$wpdb", "query_db()"], correct: 1 },
        { q: "REST API endpoint starts with?", options: ["/api/", "/wp-json/", "/json/"], correct: 1 },
        { q: "Nonce is used for?", options: ["Security", "Caching", "Speed"], correct: 0 },
        { q: "Which file defines DB credentials?", options: ["wp-config.php", "config.php", ".env"], correct: 0 },
        { q: "Which hook is for AJAX?", options: ["wp_ajax", "ajax_call", "wp_call"], correct: 0 },
        
      ]
    }
  };

  function startTimer() {
    clearInterval(timer);
    // Set time based on selected difficulty
    const difficulty = $("#difficulty").val();
    timeLeft = quizBank[difficulty].time;
    $("#timer").text(timeLeft);

    timer = setInterval(() => {
      timeLeft--;
      $("#timer").text(timeLeft);

      if (timeLeft <= 0) {
        clearInterval(timer);
        nextQuestion();
      }
    }, 1000);
  }

  function loadQuestion() {
    if (currentIndex >= questions.length) {
      $("#question").html("<b>Quiz Finished!</b><br>Final Score: " + score + "/" + totalQuestions);
      $("#options").empty();
      $("#timer").text("0");
      
      // Show restart option
      setTimeout(() => {
        if (confirm("Quiz finished! Your score: " + score + "/" + totalQuestions + "\n\nStart new quiz?")) {
          resetQuiz();
        }
      }, 500);
      
      return;
    }

    const q = questions[currentIndex];
    $("#question").text((currentIndex + 1) + ". " + q.q);
    $("#options").empty();

    q.options.forEach((opt, i) => {
      $("#options").append(
        `<div class="option" data-index="${i}">${opt}</div>`
      );
    });

    startTimer();
  }

  function nextQuestion() {
    currentIndex++;
    loadQuestion();
  }

  function updateScoreDisplay() {
    $("#currentScore").text(score);
    $("#totalQuestions").text(totalQuestions);
  }

  function resetQuiz() {
    currentIndex = 0;
    score = 0;
    $("#quizArea").hide();
    $("#startQuiz").show();
    $("#currentScore").text("0");
    $("#question").empty();
    $("#options").empty();
    $("#timer").text("5");
  }

  $(document).on("click", ".option", function () {
    clearInterval(timer);

    const selected = $(this).data("index");
    const correct = questions[currentIndex].correct;

    if (selected === correct) {
      $(this).css("background", "#b6f7b6");
      score++;
      updateScoreDisplay();
    } else {
      $(this).css("background", "#f7b6b6");
      $(`.option[data-index="${correct}"]`).css("background", "#b6f7b6");
    }

    $(".option").css("pointer-events", "none");

    setTimeout(nextQuestion, 1000);
  });

  $("#startQuiz").on("click", function () {
    // Get selected difficulty
    const difficulty = $("#difficulty").val();
    
    // Load questions based on selected difficulty
    questions = quizBank[difficulty].questions;
    totalQuestions = questions.length;
    
    currentIndex = 0;
    score = 0;

    updateScoreDisplay();

    $("#quizArea").show();
    $(this).hide();

    loadQuestion();
  });

});