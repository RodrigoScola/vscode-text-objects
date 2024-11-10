import { QuerySelector } from '../../commands';
import types from '../select/Type';

function C(): QuerySelector {
	return types.C();
}

function cpp(): QuerySelector {
	//todo: add the types
	return types.cpp();
}
function csharp(): QuerySelector {
	return types.csharp();
}
function go(): QuerySelector {
	return types.go();
}
function java(): QuerySelector {
	return types.java();
}

function rust(): QuerySelector {
	return types.rust();
}

function typescript(): QuerySelector {
	return types.typescript();
}

export default {
	C,
	cpp,
	csharp,
	go,
	java,
	rust,
	typescript,
};
