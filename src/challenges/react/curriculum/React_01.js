/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { shallow } from 'enzyme'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&#60;div /&#62</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// -------------- define challenge title and challenge instructions --------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Create a Simple JSX Element`
export const challengeText = `<span class = 'default'>Intro: </span>
React is an Open Source view library created and maintained by Facebook. It's a great tool to render the User Interface (UI) of modern web applications.<br><br>

React uses a <i>syntax extension</i> of JavaScript called JSX which allows you to write HTML directly inside JavaScript. Being able to write this way has several benefits including the fact that is allows you to use the full programmatic power of JavaScript inside the HTML, which helps keep your code readable. JSX is mostly similar to HTML, however there are a few key differences which will be explained throughout these challenges.<br><br>

You can also write JavaScript directly into JSX. To do this, include the code you want treated as JavaScript between curly braces. For example: <code> { 'alert("This is JavaScript Code.")' } </code>. This is used in several future challenges, so keep this in mind as you progress through them.<br><br>

Because JSX is a syntax extension of JavaScript, the code needs to be translated into valid JavaScript. The tool that will do this is called a <i>transpiler</i>&mdash;a word created from translator and compiler. A popular transpiler called Babel can be used for this process, and we have already included it behind-the-scenes in these challenges. If you write syntactically invalid JSX, the first test in these challenges will fail as the code will not transpile correctly.`


export const challengeInstructions = `<span class = 'default'>Instructions: </span>
The current code uses JSX to assign a <code>div</code> element to the constant <code>JSX</code>. Replace the <code>div</code> with an <code>h1</code> element
and add the text <code>Hello JSX!</code> inside it.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode = `const JSX = <div></div>;`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode = `const JSX = <h1>Hello JSX!</h1>;`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	let es5, mockedComponent, jsx, passed = true;

	let testResults = [
		{
			test: 0,
			status: false,
			condition: 'Your JSX code should transpile successfully.'
		},
		{
			test: 1,
			status: false,
			condition: 'The constant JSX should return an h1 element.'
		},
		{
			test: 2,
			status: false,
			condition: 'The h1 tag should include the text \'Hello JSX!\''
		}
	];

	const prepend = `(function() {`
	const apend = `; return JSX })()`
	const modifiedCode = prepend.concat(code).concat(apend);

	// test 0: try to transpile JSX, ES6 code to ES5 in browser
	try {
		es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		testResults[0].status = true;
	} catch (err) {
		passed = false;
		testResults[0].status = false;
	}

	// shallow render the component with Enzyme
	try {
		jsx = eval(es5);
	} catch (err) {
		passed = false;
	}

	// test 1:
	try {
		assert.strictEqual(jsx.type, 'h1', 'The constant JSX should return an h1 element.');
		testResults[1].status = true;
	} catch (err) {
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		assert.strictEqual(jsx.props.children, 'Hello JSX!', true, 'The h1 tag should include the text \'Hello JSX!\'');
		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;
	}

	return {
		passed,
		testResults,
	}

}

// ---------------------------- define live render function ----------------------------

export const liveRender = (code) => {

	try {
		const exportScript = `;\n export default JSX`
		const modifiedCode = code.concat(exportScript);
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		const renderedComponent = eval(es5);
		return renderedComponent;
	} catch (err) {
		console.log('Live rendering failed', err);
	}

}
