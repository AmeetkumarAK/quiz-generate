<?php
/*
Plugin Name: NRKbeta Know2Comment
Description: Require users to answer a quiz before commenting.
Version: 1.0
*/

if (!defined('ABSPATH')) exit;

define('NRKBCQ', 'nrkbetaquiz');

/* Enqueue JS & CSS */
add_action('wp_enqueue_scripts', function () {
  wp_enqueue_script(
    NRKBCQ,
    plugin_dir_url(__FILE__) . 'nrkbetaquiz.js',
    array('jquery'),
    null,
    true
  );

  wp_enqueue_style(
    NRKBCQ,
    plugin_dir_url(__FILE__) . 'nrkbetaquiz.css'
  );
});

/* Inject quiz before comment form */
add_action('comment_form_before', function () {
  if (!is_single()) return;

  $quiz = get_post_meta(get_the_ID(), NRKBCQ);

  if (!$quiz) return;

  echo '<div class="' . NRKBCQ . '"
        data-' . NRKBCQ . '="' . esc_attr(rawurlencode(json_encode($quiz))) . '"
        data-' . NRKBCQ . '-error="Wrong answer. Try again.">
        <h2>Answer the quiz to comment</h2>
        </div>';
});

/* Meta box */
add_action('add_meta_boxes', function () {
  add_meta_box(NRKBCQ, 'CommentQuiz', 'nrkbetaquiz_edit', 'post', 'side', 'high');
});

function nrkbetaquiz_edit($post){
  $questions = array_pad(get_post_meta($post->ID, NRKBCQ), 1, array());

  foreach ($questions as $i => $q) {
    echo '<p><strong>Question:</strong><br>';
    echo '<input type="text" name="' . NRKBCQ . '['.$i.'][text]" value="' . esc_attr($q['text'] ?? '') . '"></p>';

    for ($a=0; $a<3; $a++) {
      echo '<input type="text" name="' . NRKBCQ . '['.$i.'][answer]['.$a.']" value="' . esc_attr($q['answer'][$a] ?? '') . '">';
      echo '<input type="radio" name="' . NRKBCQ . '['.$i.'][correct]" value="'.$a.'" '.checked($q['correct'] ?? 0, $a, false).'> Correct<br>';
    }
  }
}

/* Save */
add_action('save_post', function ($post_id) {
  if (!isset($_POST[NRKBCQ])) return;

  delete_post_meta($post_id, NRKBCQ);

  foreach ($_POST[NRKBCQ] as $q) {
    if (!empty($q['text'])) {
      add_post_meta($post_id, NRKBCQ, $q);
    }
  }
});
