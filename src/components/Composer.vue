<template>
  <section class="hero is-large">
    <div id="toolbar" class="columns">
        <b-field class="column">
            <b-input v-model="title" placeholder="Article Title"></b-input>
        </b-field>
        <div class="column">
          <button class="button field is-success" @click="submit">
          <b-icon icon="floppy-o"></b-icon>
          <span>Save Changes</span>
        </button>
        <button class="button field is-danger">
          <b-icon icon="times"></b-icon>
          <span>Dismiss Changes</span>
        </button>
        </div>
    </div>
    <div id="editor">
      <textarea :value="input" @input="update" />
      <article-show :article="input"></article-show>
    </div>
  </section>
</template>

<script>
import debounce from "lodash";
import Vue from "vue";
import ArticleShow from "@/components/ArticleShow";
import axios from "axios";

export default {
  components: {
    ArticleShow
  },
  data() {
    return {
      input: `# This is an &lt;h1&gt; tag
## This is an &lt;h2&gt; tag
### This is an &lt;h3&gt; tag
#### This is an &lt;h4&gt; tag
##### This is an &lt;h5&gt; tag
###### This is an &lt;h6&gt; tag
This is an H1
=============
This is an H2
-------------

Emphasis, aka italics, with *asterisks* or _underscores_.
Strong emphasis, aka bold, with **asterisks** or __underscores__.
Combined emphasis with **asterisks and _underscores_**.
Strikethrough uses two tildes. ~~Scratch this.~~

1. First ordered list item
2. Another item
  * Unordered sub-list.
1. Actual numbers don't matter, just that it's a number
  1. Ordered sub-list
4. And another item.
   Some text that should be aligned with the above item.
* Unordered list can use asterisks
- Or minuses
+ Or pluses

[I'm an inline-style link](https://www.google.com)
[I'm a reference-style link][Arbitrary case-insensitive reference text]
[You can use numbers for reference-style link definitions][1]
Or leave it empty and use the [link text itself]
URLs and URLs in angle brackets will automatically get turned into links.
http://www.example.com or &lt;http://www.example.com> and sometimes
example.com (but not on Github, for example).
Some text to show that the reference links can follow later.
[arbitrary case-insensitive reference text]: https://www.mozilla.org
[1]: http://slashdot.org
[link text itself]: http://www.reddit.com

Here's our logo (hover to see the title text):
Inline-style:
![alt text](https://i.pinimg.com/736x/1d/45/e0/1d45e0f646e17cc87257ebd5869b0ff0--cute-notebooks-spiral-notebooks.jpg "Logo Title Text 1")
Reference-style:
![alt text][logo]
[logo]: https://i.pinimg.com/736x/1d/45/e0/1d45e0f646e17cc87257ebd5869b0ff0--cute-notebooks-spiral-notebooks.jpg "Logo Title Text 2"


> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.
Quote break.
> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can *put* **Markdown** into a blockquote. 

Three or more...
---
Hyphens
***
Asterisks
___
Underscores

A paragraph is simply one or more consecutive lines of text, separated by one or more blank lines. (A blank line is any line that looks like a blank line — a line containing nothing but spaces or tabs is considered blank.) Normal paragraphs should not be indented with spaces or tabs.
The implication of the “one or more consecutive lines of text” rule is that Markdown supports “hard-wrapped” text paragraphs. This differs significantly from most other text-to-HTML formatters (including Movable Type’s “Convert Line Breaks” option) which translate every line break character in a paragraph into a <br /> tag.
When you do want to insert a <br /> break tag using Markdown, you end a line with two or more spaces, then type return.
Yes, this takes a tad more effort to create a <br />, but a simplistic “every line break is a <br />” rule wouldn’t work for Markdown. Markdown’s email-style blockquoting and multi-paragraph list items work best — and look better — when you format them with hard breaks.`,
      title: ""
    };
  },
  methods: {
    update: _.debounce(function(e) {
      this.input = e.target.value;
    }, 300),
    submit: function() {
      let payload = {
        title: this.title ? this.title : "untitled",
        text: this.input
      };
      axios.post("/api/article", payload);
    }
  }
};
</script>

<style scoped>
html,
body,
#editor {
  height: 80vh;
  font-family: "Helvetica Neue", Arial, sans-serif;
  color: #333;
}

#toolbar{
  margin:0;
}

textarea,
#editor div {
  display: inline-block;
  width: 49%;
  height: 100%;
  vertical-align: top;
  box-sizing: border-box;
  padding: 20px 20px;
  overflow: auto;
}

textarea {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: "Monaco", courier, monospace;
  padding: 20px;
}

code {
  color: #f66;
}

#toolbar {
  padding: 20px;
}
</style>
