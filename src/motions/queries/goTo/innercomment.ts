import { QuerySelector } from '../../commands';
import innerComment from '../select/comment';

function C(): QuerySelector {
	return innerComment.C();
}

function cpp(): QuerySelector {
	return innerComment.cpp();
}
function csharp(): QuerySelector {
	return innerComment.csharp();
}
function go(): QuerySelector {
	return innerComment.go();
}
function java(): QuerySelector {
	return innerComment.java();
}
function javascript(): QuerySelector {
	return innerComment.javascript();
}

function json(): QuerySelector {
	return innerComment.json();
}

function lua(): QuerySelector {
	return innerComment.lua();
}

function python(): QuerySelector {
	return innerComment.python();
}
function rust(): QuerySelector {
	return innerComment.rust();
}

function toml(): QuerySelector {
	return innerComment.toml();
}

function typescript(): QuerySelector {
	return innerComment.typescript();
}

export default {
	C,
	cpp,
	csharp,
	go,
	java,
	javascript,
	json,
	toml,
	lua,
	python,
	rust,
	typescript,
};
