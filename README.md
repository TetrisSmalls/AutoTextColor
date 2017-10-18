# AutoTextColor
A lightweight jQuery plugin that sets an element's text to either black or white automatically, depending on the background color to give the best contrast. If an element does not have a background, the parent element's background is used and so on until a background is found.

## Demo / Examples

[AutoTextColor Demo / Examples](https://coynem.com/autotextcolor/)

## Usage

~~~ html
<div class="card" style="background: #fe626d;">
  <h2>Lorem Ipsum</h2>
  <p>Sed dapibus nunc ac blandit porta.</p>
</div>
~~~

~~~ js
$(document).ready(function(){
  $('div.card').autotextcolor();
});
~~~
