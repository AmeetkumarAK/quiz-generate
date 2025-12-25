document.addEventListener('DOMContentLoaded', function () {

  var NRKBCQ = 'nrkbetaquiz';

  document.querySelectorAll('.' + NRKBCQ).forEach(function (quizNode) {

    var form = quizNode.nextElementSibling;
    var data = quizNode.getAttribute('data-' + NRKBCQ);

    if (!form || !data) return;

    var questions;
    try {
      questions = JSON.parse(decodeURIComponent(data));
    } catch (e) {
      return;
    }

    if (!questions.length) return;

    /* ========= LOCK COMMENT FORM INITIALLY ========= */
    form.querySelectorAll('textarea, input[type=submit]')
      .forEach(el => el.disabled = true);

    /* ========= TIMER (10 SECONDS) ========= */
    var timeLeft = 10;
    var timerExpired = false;

    var timerNode = document.createElement('p');
    timerNode.style.fontWeight = 'bold';
    timerNode.style.color = 'red';
    timerNode.textContent = '⏱ Time left: 10 seconds';
    quizNode.appendChild(timerNode);

    var timer = setInterval(function () {
      timeLeft--;
      timerNode.textContent = '⏱ Time left: ' + timeLeft + ' seconds';

      if (timeLeft <= 0) {
        clearInterval(timer);
        timerExpired = true;
        timerNode.textContent = '⏰ Time over! You cannot comment.';

        quizNode.querySelectorAll('input[type="radio"]')
          .forEach(i => i.disabled = true);

        form.querySelectorAll('textarea, input[type=submit]')
          .forEach(el => el.disabled = true);
      }
    }, 1000);

    /* ========= BUILD QUIZ ========= */
    var container = document.createElement('div');
    quizNode.appendChild(container);

    questions.forEach(function (q, i) {
      container.appendChild(document.createElement('h3')).textContent = q.text;

      q.answer.forEach(function (ans, idx) {
        if (!ans) return;

        var label = document.createElement('label');
        var input = document.createElement('input');

        input.type = 'radio';
        input.name = NRKBCQ + i;
        input.value = idx;

        label.appendChild(input);
        label.append(' ' + ans);

        container.appendChild(label);
        container.appendChild(document.createElement('br'));
      });
    });

    /* ========= ONE-ATTEMPT + GLOW HANDLING ========= */
    var answeredOnce = false;

    quizNode.addEventListener('change', function (e) {

      if (timerExpired || answeredOnce) return;
      if (!e.target || e.target.type !== 'radio') return;

      answeredOnce = true;     // 🔒 only one attempt
      clearInterval(timer);   // stop timer

      // Disable all options
      quizNode.querySelectorAll('input[type="radio"]')
        .forEach(i => i.disabled = true);

      // Remove previous glow
      container.querySelectorAll('label')
        .forEach(l => l.classList.remove('correct', 'wrong'));

      var input = e.target;
      var label = input.parentElement;

      var questionIndex = parseInt(
        input.name.replace(NRKBCQ, ''),
        10
      );

      var isCorrect =
        Number(input.value) === Number(questions[questionIndex].correct);

      if (isCorrect) {
        label.classList.add('correct');

        // ✅ unlock comment form
        form.querySelectorAll('textarea, input[type=submit]')
          .forEach(el => el.disabled = false);

      } else {
        label.classList.add('wrong');

        // ❌ permanently locked
        form.querySelectorAll('textarea, input[type=submit]')
          .forEach(el => el.disabled = true);
      }
    });

  });

});
