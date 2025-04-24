import { groupMatches } from '../parsing/position';
import {
	createGoToPrevious,
	createChangeNext,
	createChangePrevious,
	createDeletePrevious,
	createSelectNext,
	createDeleteNext,
	createYankNext,
	createYankPrevious,
	withInnerStringModifier,
	withMatchFunc,
	createSelectPrevious,
	createGoToNext,
	createGoToNextEnd,
	createGoToPreviousEnd,
} from './modifiers';
import { select as selectOuterArray } from './queries/Array';
import Call from './queries/call';
import Class from './queries/class';
import Comment from './queries/comment';
import Conditional from './queries/Conditional';
import Function from './queries/Function';
import InnerArray from './queries/innerArray';
import InnerCall from './queries/innerCall';
import InnerClass from './queries/innerClass';
import InnerComment from './queries/innercomment';
import InnerConditional from './queries/innerConditional';
import InnerFunction from './queries/innerFunction';
import InnerLhs from './queries/innerLhs';
import InnerLoop from './queries/innerLoop';
import InnerNode from './queries/innerNode';
import InnerObject from './queries/innerObject';
import InnerParams from './queries/innerParams';
import InnerRhs from './queries/innerRhs';
import InnerStr from './queries/innerString';
import InnerType from './queries/innerType';
import Lhs from './queries/Lhs';
import Loop from './queries/Loop';
import Node from './queries/Node';
import OuterObject from './queries/Object';
import { select as Params, goTo as GotoParams } from './queries/Params';
import Rhs from './queries/Rhs';
import Str from './queries/String';
import Type from './queries/Type';
import Variable from './queries/Variables';
import assert from 'assert';
import { filterDuplicates } from '../parsing/nodes';
import { SupportedLanguages } from '../parsing/parser';
import { addSelectors } from './commands';
import { QueryMatch } from 'web-tree-sitter';

const selectNextCommand: Command[] = [
	addSelectors(
		withMatchFunc(createSelectNext('outer', 'function'), function (_, matches) {
			return filterDuplicates(matches, 'function');
		}),
		Function
	),
	addSelectors(withMatchFunc(createSelectNext('inner', 'function'), groupMatches), InnerFunction),
	addSelectors(createSelectNext('outer', 'loop'), Loop),
	addSelectors(withMatchFunc(createSelectNext('inner', 'loop'), groupMatches), InnerLoop),
	addSelectors(createSelectNext('outer', 'conditional'), Conditional),
	addSelectors(
		withMatchFunc(createSelectNext('inner', 'conditional'), function (ctx, matches) {
			const language = ctx.editor.language();
			if (
				//java && javascript
				!language.includes('java') &&
				//javascript, javascriptreact, typescript, typescriptreact
				!language.includes('script') &&
				!language.includes('python')
			) {
				return groupMatches(ctx, matches);
			}
			return matches;
		}),
		InnerConditional
	),
	addSelectors(createSelectNext('outer', 'rhs'), Rhs),
	addSelectors(createSelectNext('inner', 'rhs'), InnerRhs),
	addSelectors(createSelectNext('outer', 'lhs'), Lhs),
	addSelectors(createSelectNext('inner', 'lhs'), InnerLhs),
	addSelectors(
		withMatchFunc(createSelectNext('outer', 'variable'), (_, matches) =>
			filterDuplicates(matches, ['declaration', 'variable'])
		),
		Variable
	),
	addSelectors(createSelectNext('outer', 'string'), Str),
	addSelectors(withInnerStringModifier(createSelectNext('inner', 'string')), InnerStr),

	addSelectors(createSelectNext('outer', 'class'), Class),
	addSelectors(createSelectNext('inner', 'class'), InnerClass),
	addSelectors(createSelectNext('outer', 'array'), selectOuterArray),
	addSelectors(createSelectNext('inner', 'array'), InnerArray),
	addSelectors(
		withMatchFunc(createSelectNext('outer', 'object'), function (ctx, matches) {
			assert(
				SupportedLanguages.includes(ctx.editor.language()),
				'trying to select in an unsupported language?'
			);

			if (ctx.editor.language() === 'c') {
				return filterDuplicates(matches, 'object');
			}
			return matches;
		}),
		OuterObject
	),
	addSelectors(createSelectNext('inner', 'object'), InnerObject),

	addSelectors(withMatchFunc(createSelectNext('outer', 'parameters'), groupMatches), Params),
	addSelectors(createSelectNext('inner', 'parameters'), InnerParams),
	addSelectors(createSelectNext('outer', 'call'), Call),
	addSelectors(createSelectNext('inner', 'call'), InnerCall),
	addSelectors(createSelectNext('outer', 'type'), Type),
	addSelectors(createSelectNext('inner', 'type'), InnerType),
	addSelectors(createSelectNext('outer', 'comment'), Comment),
	addSelectors(createSelectNext('inner', 'comment'), InnerComment),

	addSelectors(withMatchFunc(createSelectNext('outer', 'node'), FilterNodeDuplicates), Node),
	addSelectors(createSelectNext('inner', 'node'), InnerNode),
];

const goToNextStartCommands: Command[] = [
	addSelectors(
		withMatchFunc(createGoToNext('outer', 'function'), (_, matches) =>
			filterDuplicates(matches, 'function')
		),
		Function
	),
	addSelectors(withMatchFunc(createGoToNext('inner', 'function'), groupMatches), InnerFunction),
	addSelectors(createGoToNext('outer', 'loop'), Loop),
	addSelectors(withMatchFunc(createGoToNext('inner', 'loop'), groupMatches), InnerLoop),
	addSelectors(createGoToNext('outer', 'conditional'), Conditional),
	addSelectors(withMatchFunc(createGoToNext('inner', 'conditional'), groupMatches), InnerConditional),
	addSelectors(createGoToNext('outer', 'rhs'), Rhs),
	addSelectors(createGoToNext('inner', 'rhs'), InnerRhs),
	addSelectors(createGoToNext('outer', 'lhs'), Lhs),
	addSelectors(createGoToNext('inner', 'lhs'), InnerLhs),
	addSelectors(createGoToNext('outer', 'variable'), Variable),
	addSelectors(createGoToNext('outer', 'string'), Str),
	addSelectors(withInnerStringModifier(createGoToNext('inner', 'string')), InnerStr),
	addSelectors(createGoToNext('outer', 'class'), Class),
	addSelectors(createGoToNext('inner', 'class'), InnerClass),
	addSelectors(createGoToNext('outer', 'array'), selectOuterArray),
	addSelectors(createGoToNext('inner', 'array'), InnerArray),
	addSelectors(
		withMatchFunc(createGoToNext('outer', 'object'), function (ctx, matches) {
			assert(
				SupportedLanguages.includes(ctx.editor.language()),
				'trying to select in an unsupported language?'
			);

			if (ctx.editor.language() === 'c') {
				return filterDuplicates(matches, 'object');
			}
			return matches;
		}),
		OuterObject
	),
	addSelectors(createGoToNext('inner', 'object'), InnerObject),
	addSelectors(createGoToNext('outer', 'parameters'), GotoParams),
	addSelectors(createGoToNext('inner', 'parameters'), InnerParams),
	addSelectors(createGoToNext('outer', 'call'), Call),
	addSelectors(createGoToNext('inner', 'call'), InnerCall),
	addSelectors(createGoToNext('outer', 'type'), Type),
	addSelectors(createGoToNext('inner', 'type'), InnerType),
	addSelectors(createGoToNext('outer', 'comment'), Comment),
	addSelectors(createGoToNext('inner', 'comment'), InnerComment),

	addSelectors(createGoToNext('outer', 'node'), Node),
	addSelectors(createGoToNext('inner', 'node'), InnerNode),
];

const goToPreviousCommands: Command[] = [
	addSelectors(
		withMatchFunc(createGoToPrevious('outer', 'function'), (_, matches) =>
			filterDuplicates(matches, 'function')
		),
		Function
	),
	addSelectors(withMatchFunc(createGoToPrevious('inner', 'function'), groupMatches), InnerFunction),
	addSelectors(createGoToPrevious('outer', 'loop'), Loop),
	addSelectors(createGoToPrevious('inner', 'loop'), InnerLoop),
	addSelectors(createGoToPrevious('outer', 'conditional'), Conditional),
	addSelectors(withMatchFunc(createGoToPrevious('inner', 'conditional'), groupMatches), InnerConditional),
	addSelectors(createGoToPrevious('outer', 'rhs'), Rhs),
	addSelectors(createGoToPrevious('inner', 'rhs'), InnerRhs),
	addSelectors(createGoToPrevious('outer', 'lhs'), Lhs),
	addSelectors(createGoToPrevious('inner', 'lhs'), InnerLhs),
	addSelectors(createGoToPrevious('outer', 'variable'), Variable),
	addSelectors(createGoToPrevious('outer', 'string'), Str),
	addSelectors(withInnerStringModifier(createGoToPrevious('inner', 'string')), InnerStr),
	addSelectors(createGoToPrevious('outer', 'class'), Class),
	addSelectors(createGoToPrevious('inner', 'class'), InnerClass),
	addSelectors(createGoToPrevious('outer', 'array'), selectOuterArray),
	addSelectors(createGoToPrevious('inner', 'array'), InnerArray),
	addSelectors(
		withMatchFunc(createGoToPrevious('outer', 'object'), function (ctx, matches) {
			assert(
				SupportedLanguages.includes(ctx.editor.language()),
				'trying to select in an unsupported language?'
			);

			if (ctx.editor.language() === 'c') {
				return filterDuplicates(matches, 'object');
			}
			return matches;
		}),
		OuterObject
	),
	addSelectors(createGoToPrevious('inner', 'object'), InnerObject),
	addSelectors(createGoToPrevious('inner', 'parameters'), InnerParams),
	addSelectors(withMatchFunc(createGoToPrevious('outer', 'parameters'), groupMatches), GotoParams),
	addSelectors(withMatchFunc(createGoToPrevious('outer', 'call'), groupMatches), Call),
	addSelectors(createGoToPrevious('inner', 'call'), InnerCall),
	addSelectors(createGoToPrevious('outer', 'type'), Type),
	addSelectors(createGoToPrevious('inner', 'type'), InnerType),
	addSelectors(createGoToPrevious('outer', 'comment'), Comment),
	addSelectors(createGoToPrevious('inner', 'comment'), InnerComment),

	addSelectors(createGoToPrevious('outer', 'node'), Node),
	addSelectors(createGoToPrevious('inner', 'node'), InnerNode),
];

const goToPreviousEndCommands: Command[] = [
	addSelectors(
		withMatchFunc(createGoToPreviousEnd('outer', 'function'), (_, matches) =>
			filterDuplicates(matches, 'function')
		),
		Function
	),
	addSelectors(withMatchFunc(createGoToPreviousEnd('inner', 'function'), groupMatches), InnerFunction),
	addSelectors(createGoToPreviousEnd('outer', 'loop'), Loop),
	addSelectors(createGoToPreviousEnd('inner', 'loop'), InnerLoop),
	addSelectors(createGoToPreviousEnd('outer', 'conditional'), Conditional),
	addSelectors(withMatchFunc(createGoToPreviousEnd('inner', 'conditional'), groupMatches), InnerConditional),
	addSelectors(createGoToPreviousEnd('outer', 'rhs'), Rhs),
	addSelectors(createGoToPreviousEnd('inner', 'rhs'), InnerRhs),
	addSelectors(createGoToPreviousEnd('outer', 'lhs'), Lhs),
	addSelectors(createGoToPreviousEnd('inner', 'lhs'), InnerLhs),
	addSelectors(createGoToPreviousEnd('outer', 'variable'), Variable),
	addSelectors(createGoToPreviousEnd('outer', 'string'), Str),
	addSelectors(withInnerStringModifier(createGoToPreviousEnd('inner', 'string')), InnerStr),
	addSelectors(createGoToPreviousEnd('outer', 'class'), Class),
	addSelectors(createGoToPreviousEnd('inner', 'class'), InnerClass),
	addSelectors(createGoToPreviousEnd('outer', 'array'), selectOuterArray),
	addSelectors(createGoToPreviousEnd('inner', 'array'), InnerArray),
	addSelectors(
		withMatchFunc(createGoToPreviousEnd('outer', 'object'), function (ctx, matches) {
			assert(
				SupportedLanguages.includes(ctx.editor.language()),
				'trying to select in an unsupported language?'
			);

			if (ctx.editor.language() === 'c') {
				return filterDuplicates(matches, 'object');
			}
			return matches;
		}),
		OuterObject
	),
	addSelectors(createGoToPreviousEnd('inner', 'object'), InnerObject),
	addSelectors(createGoToPreviousEnd('inner', 'parameters'), InnerParams),
	addSelectors(withMatchFunc(createGoToPreviousEnd('outer', 'parameters'), groupMatches), GotoParams),
	addSelectors(withMatchFunc(createGoToPreviousEnd('outer', 'call'), groupMatches), Call),
	addSelectors(createGoToPreviousEnd('inner', 'call'), InnerCall),
	addSelectors(createGoToPreviousEnd('outer', 'type'), Type),
	addSelectors(createGoToPreviousEnd('inner', 'type'), InnerType),
	addSelectors(createGoToPreviousEnd('outer', 'comment'), Comment),
	addSelectors(createGoToPreviousEnd('inner', 'comment'), InnerComment),
];

const goToNextEndCommands: Command[] = [
	addSelectors(
		withMatchFunc(createGoToNextEnd('outer', 'function'), (_, matches) =>
			filterDuplicates(matches, 'function')
		),
		Function
	),

	addSelectors(withMatchFunc(createGoToNextEnd('inner', 'function'), groupMatches), InnerFunction),
	addSelectors(createGoToNextEnd('outer', 'loop'), Loop),
	addSelectors(withMatchFunc(createGoToNextEnd('inner', 'loop'), groupMatches), InnerLoop),
	addSelectors(createGoToNextEnd('outer', 'conditional'), Conditional),
	addSelectors(withMatchFunc(createGoToNextEnd('inner', 'conditional'), groupMatches), InnerConditional),
	addSelectors(createGoToNextEnd('outer', 'rhs'), Rhs),
	addSelectors(createGoToNextEnd('inner', 'rhs'), InnerRhs),
	addSelectors(createGoToNextEnd('outer', 'lhs'), Lhs),
	addSelectors(createGoToNextEnd('inner', 'lhs'), InnerLhs),
	addSelectors(createGoToNextEnd('outer', 'variable'), Variable),
	addSelectors(createGoToNextEnd('outer', 'string'), Str),
	addSelectors(withInnerStringModifier(createGoToNextEnd('inner', 'string')), InnerStr),
	addSelectors(createGoToNextEnd('outer', 'class'), Class),
	addSelectors(createGoToNextEnd('inner', 'class'), InnerClass),
	addSelectors(createGoToNextEnd('outer', 'array'), selectOuterArray),
	addSelectors(createGoToNextEnd('inner', 'array'), InnerArray),
	addSelectors(
		withMatchFunc(createGoToNextEnd('outer', 'object'), function (ctx, matches) {
			assert(
				SupportedLanguages.includes(ctx.editor.language()),
				'trying to select in an unsupported language?'
			);

			if (ctx.editor.language() === 'c') {
				return filterDuplicates(matches, 'object');
			}
			return matches;
		}),
		OuterObject
	),
	addSelectors(createGoToNextEnd('inner', 'object'), InnerObject),
	addSelectors(createGoToNextEnd('outer', 'parameters'), GotoParams),
	addSelectors(createGoToNextEnd('inner', 'parameters'), InnerParams),
	addSelectors(createGoToNextEnd('outer', 'call'), Call),
	addSelectors(createGoToNextEnd('inner', 'call'), InnerCall),
	addSelectors(createGoToNextEnd('outer', 'type'), Type),
	addSelectors(createGoToNextEnd('inner', 'type'), InnerType),
	addSelectors(createGoToNextEnd('outer', 'comment'), Comment),
	addSelectors(createGoToNextEnd('inner', 'comment'), InnerComment),

	addSelectors(createGoToNextEnd('inner', 'node'), InnerNode),
	addSelectors(createGoToNextEnd('outer', 'node'), Node),
];

const selectPreviousCommands: Command[] = [
	addSelectors(
		withMatchFunc(createSelectPrevious('outer', 'function'), (_, matches) =>
			filterDuplicates(matches, 'function')
		),
		Function
	),

	addSelectors(withMatchFunc(createSelectPrevious('inner', 'function'), groupMatches), InnerFunction),
	addSelectors(createSelectPrevious('outer', 'loop'), Loop),
	addSelectors(createSelectPrevious('inner', 'loop'), InnerLoop),
	addSelectors(createSelectPrevious('outer', 'conditional'), Conditional),
	addSelectors(createSelectPrevious('inner', 'conditional'), InnerConditional),
	addSelectors(createSelectPrevious('outer', 'rhs'), Rhs),
	addSelectors(createSelectPrevious('inner', 'rhs'), InnerRhs),
	addSelectors(createSelectPrevious('outer', 'lhs'), Lhs),
	addSelectors(createSelectPrevious('inner', 'lhs'), InnerLhs),
	addSelectors(createSelectPrevious('outer', 'variable'), Variable),
	addSelectors(createSelectPrevious('outer', 'string'), Str),
	addSelectors(withInnerStringModifier(createSelectPrevious('inner', 'string')), InnerStr),
	addSelectors(createSelectPrevious('outer', 'class'), Class),
	addSelectors(createSelectPrevious('inner', 'class'), InnerClass),
	addSelectors(createSelectPrevious('outer', 'array'), selectOuterArray),
	addSelectors(createSelectPrevious('inner', 'array'), InnerArray),
	addSelectors(
		withMatchFunc(createSelectPrevious('outer', 'object'), function (ctx, matches) {
			assert(
				SupportedLanguages.includes(ctx.editor.language()),
				'trying to select in an unsupported language?'
			);

			if (ctx.editor.language() === 'c') {
				return filterDuplicates(matches, 'object');
			}
			return matches;
		}),
		OuterObject
	),
	addSelectors(createSelectPrevious('inner', 'object'), InnerObject),
	addSelectors(createSelectPrevious('inner', 'parameters'), InnerParams),
	addSelectors(withMatchFunc(createSelectPrevious('outer', 'parameters'), groupMatches), Params),
	addSelectors(withMatchFunc(createSelectPrevious('outer', 'call'), groupMatches), Call),
	addSelectors(createSelectPrevious('inner', 'call'), InnerCall),
	addSelectors(createSelectPrevious('outer', 'type'), Type),
	addSelectors(createSelectPrevious('inner', 'type'), InnerType),
	addSelectors(createSelectPrevious('outer', 'comment'), Comment),
	addSelectors(createSelectPrevious('inner', 'comment'), InnerComment),

	addSelectors(createSelectPrevious('outer', 'node'), Node),
	addSelectors(createSelectPrevious('inner', 'node'), InnerNode),
];

const deleteNextCommands: Command[] = [
	addSelectors(
		withMatchFunc(createDeleteNext('outer', 'function'), function (_, matches) {
			return filterDuplicates(matches, 'function');
		}),
		Function
	),
	addSelectors(withMatchFunc(createDeleteNext('inner', 'function'), groupMatches), InnerFunction),
	addSelectors(createDeleteNext('outer', 'loop'), Loop),
	addSelectors(withMatchFunc(createDeleteNext('inner', 'loop'), groupMatches), InnerLoop),
	addSelectors(createDeleteNext('outer', 'conditional'), Conditional),
	addSelectors(
		withMatchFunc(createDeleteNext('inner', 'conditional'), function (ctx, matches) {
			const language = ctx.editor.language();
			if (
				//java && javascript
				!language.includes('java') &&
				//javascript, javascriptreact, typescript, typescriptreact
				!language.includes('script') &&
				!language.includes('python')
			) {
				return groupMatches(ctx, matches);
			}
			return matches;
		}),
		InnerConditional
	),
	addSelectors(createDeleteNext('outer', 'rhs'), Rhs),
	addSelectors(createDeleteNext('inner', 'rhs'), InnerRhs),
	addSelectors(createDeleteNext('outer', 'lhs'), Lhs),
	addSelectors(createDeleteNext('inner', 'lhs'), InnerLhs),
	addSelectors(
		withMatchFunc(createDeleteNext('outer', 'variable'), (_, matches) =>
			filterDuplicates(matches, ['declaration', 'variable'])
		),
		Variable
	),
	addSelectors(createDeleteNext('outer', 'string'), Str),
	addSelectors(withInnerStringModifier(createDeleteNext('inner', 'string')), InnerStr),
	addSelectors(
		withMatchFunc(createDeleteNext('outer', 'class'), (_, matches) => filterDuplicates(matches, 'class')),
		Class
	),
	addSelectors(createDeleteNext('inner', 'class'), InnerClass),
	addSelectors(createDeleteNext('outer', 'array'), selectOuterArray),
	addSelectors(createDeleteNext('inner', 'array'), InnerArray),
	addSelectors(
		withMatchFunc(createDeleteNext('outer', 'object'), function (ctx, matches) {
			assert(
				SupportedLanguages.includes(ctx.editor.language()),
				'trying to select in an unsupported language?'
			);

			if (ctx.editor.language() === 'c') {
				return filterDuplicates(matches, 'object');
			}
			return matches;
		}),
		OuterObject
	),
	addSelectors(createDeleteNext('inner', 'object'), InnerObject),

	addSelectors(withMatchFunc(createDeleteNext('outer', 'parameters'), groupMatches), Params),
	addSelectors(createDeleteNext('inner', 'parameters'), InnerParams),
	addSelectors(createDeleteNext('outer', 'call'), Call),
	addSelectors(createDeleteNext('inner', 'call'), InnerCall),
	addSelectors(createDeleteNext('outer', 'type'), Type),
	addSelectors(createDeleteNext('inner', 'type'), InnerType),
	addSelectors(createDeleteNext('outer', 'comment'), Comment),
	addSelectors(createDeleteNext('inner', 'comment'), InnerComment),

	addSelectors(withMatchFunc(createDeleteNext('outer', 'node'), FilterNodeDuplicates), Node),
	addSelectors(createDeletePrevious('inner', 'node'), InnerNode),
];

const deletePreviousCommands: Command[] = [
	addSelectors(
		withMatchFunc(createDeletePrevious('outer', 'function'), function (_, matches) {
			return filterDuplicates(matches, 'function');
		}),
		Function
	),
	addSelectors(withMatchFunc(createDeletePrevious('inner', 'function'), groupMatches), InnerFunction),
	addSelectors(createDeletePrevious('outer', 'loop'), Loop),
	addSelectors(withMatchFunc(createDeletePrevious('inner', 'loop'), groupMatches), InnerLoop),
	addSelectors(createDeletePrevious('outer', 'conditional'), Conditional),
	addSelectors(
		withMatchFunc(createDeletePrevious('inner', 'conditional'), function (ctx, matches) {
			const language = ctx.editor.language();
			if (
				//java && javascript
				!language.includes('java') &&
				//javascript, javascriptreact, typescript, typescriptreact
				!language.includes('script') &&
				!language.includes('python')
			) {
				return groupMatches(ctx, matches);
			}
			return matches;
		}),
		InnerConditional
	),
	addSelectors(createDeletePrevious('outer', 'rhs'), Rhs),
	addSelectors(createDeletePrevious('inner', 'rhs'), InnerRhs),
	addSelectors(createDeletePrevious('outer', 'lhs'), Lhs),
	addSelectors(createDeletePrevious('inner', 'lhs'), InnerLhs),
	addSelectors(
		withMatchFunc(createDeletePrevious('outer', 'variable'), (_, matches) =>
			filterDuplicates(matches, ['declaration', 'variable'])
		),
		Variable
	),
	addSelectors(createDeletePrevious('outer', 'string'), Str),
	addSelectors(withInnerStringModifier(createDeletePrevious('inner', 'string')), InnerStr),
	addSelectors(
		withMatchFunc(createDeletePrevious('outer', 'class'), (_, matches) =>
			filterDuplicates(matches, 'class')
		),
		Class
	),
	addSelectors(createDeletePrevious('inner', 'class'), InnerClass),
	addSelectors(createDeletePrevious('outer', 'array'), selectOuterArray),
	addSelectors(createDeletePrevious('inner', 'array'), InnerArray),
	addSelectors(
		withMatchFunc(createDeletePrevious('outer', 'object'), function (ctx, matches) {
			assert(
				SupportedLanguages.includes(ctx.editor.language()),
				'trying to select in an unsupported language?'
			);

			if (ctx.editor.language() === 'c') {
				return filterDuplicates(matches, 'object');
			}
			return matches;
		}),
		OuterObject
	),
	addSelectors(createDeletePrevious('inner', 'object'), InnerObject),

	addSelectors(withMatchFunc(createDeletePrevious('outer', 'parameters'), groupMatches), Params),
	addSelectors(createDeletePrevious('inner', 'parameters'), InnerParams),
	addSelectors(createDeletePrevious('outer', 'call'), Call),
	addSelectors(createDeletePrevious('inner', 'call'), InnerCall),
	addSelectors(createDeletePrevious('outer', 'type'), Type),
	addSelectors(createDeletePrevious('inner', 'type'), InnerType),
	addSelectors(createDeletePrevious('outer', 'comment'), Comment),
	addSelectors(createDeletePrevious('inner', 'comment'), InnerComment),
];

const yankNextCommands: Command[] = [
	addSelectors(
		withMatchFunc(createYankNext('outer', 'function'), function (_, matches) {
			return filterDuplicates(matches, 'function');
		}),
		Function
	),
	addSelectors(withMatchFunc(createYankNext('inner', 'function'), groupMatches), InnerFunction),
	addSelectors(createYankNext('outer', 'loop'), Loop),
	addSelectors(withMatchFunc(createYankNext('inner', 'loop'), groupMatches), InnerLoop),
	addSelectors(createYankNext('outer', 'conditional'), Conditional),
	addSelectors(
		withMatchFunc(createYankNext('inner', 'conditional'), function (ctx, matches) {
			const language = ctx.editor.language();
			if (
				//java && javascript
				!language.includes('java') &&
				//javascript, javascriptreact, typescript, typescriptreact
				!language.includes('script') &&
				!language.includes('python')
			) {
				return groupMatches(ctx, matches);
			}
			return matches;
		}),
		InnerConditional
	),
	addSelectors(createYankNext('outer', 'rhs'), Rhs),
	addSelectors(createYankNext('inner', 'rhs'), InnerRhs),
	addSelectors(createYankNext('outer', 'lhs'), Lhs),
	addSelectors(createYankNext('inner', 'lhs'), InnerLhs),
	addSelectors(
		withMatchFunc(createYankNext('outer', 'variable'), (_, matches) =>
			filterDuplicates(matches, ['declaration', 'variable'])
		),
		Variable
	),
	addSelectors(createYankNext('outer', 'string'), Str),
	addSelectors(withInnerStringModifier(createYankNext('inner', 'string')), InnerStr),
	addSelectors(
		withMatchFunc(createYankNext('outer', 'class'), (_, matches) => filterDuplicates(matches, 'class')),
		Class
	),
	addSelectors(createYankNext('inner', 'class'), InnerClass),
	addSelectors(createYankNext('outer', 'array'), selectOuterArray),
	addSelectors(createYankNext('inner', 'array'), InnerArray),
	addSelectors(
		withMatchFunc(createYankNext('outer', 'object'), function (ctx, matches) {
			assert(
				SupportedLanguages.includes(ctx.editor.language()),
				'trying to select in an unsupported language?'
			);

			if (ctx.editor.language() === 'c') {
				return filterDuplicates(matches, 'object');
			}
			return matches;
		}),
		OuterObject
	),
	addSelectors(createYankNext('inner', 'object'), InnerObject),

	addSelectors(withMatchFunc(createYankNext('outer', 'parameters'), groupMatches), Params),
	addSelectors(createYankNext('inner', 'parameters'), InnerParams),
	addSelectors(createYankNext('outer', 'call'), Call),
	addSelectors(createYankNext('inner', 'call'), InnerCall),
	addSelectors(createYankNext('outer', 'type'), Type),
	addSelectors(createYankNext('inner', 'type'), InnerType),
	addSelectors(createYankNext('outer', 'comment'), Comment),
	addSelectors(createYankNext('inner', 'comment'), InnerComment),

	addSelectors(withMatchFunc(createYankNext('outer', 'node'), FilterNodeDuplicates), Node),
	addSelectors(createYankNext('inner', 'node'), InnerNode),
];

const yankPreviousCommands: Command[] = [
	addSelectors(
		withMatchFunc(createYankPrevious('outer', 'function'), function (_, matches) {
			return filterDuplicates(matches, 'function');
		}),
		Function
	),
	addSelectors(withMatchFunc(createYankPrevious('inner', 'function'), groupMatches), InnerFunction),
	addSelectors(createYankPrevious('outer', 'loop'), Loop),
	addSelectors(withMatchFunc(createYankPrevious('inner', 'loop'), groupMatches), InnerLoop),
	addSelectors(createYankPrevious('outer', 'conditional'), Conditional),
	addSelectors(
		withMatchFunc(createYankPrevious('inner', 'conditional'), function (ctx, matches) {
			const language = ctx.editor.language();
			if (
				//java && javascript
				!language.includes('java') &&
				//javascript, javascriptreact, typescript, typescriptreact
				!language.includes('script') &&
				!language.includes('python')
			) {
				return groupMatches(ctx, matches);
			}
			return matches;
		}),
		InnerConditional
	),
	addSelectors(createYankPrevious('outer', 'rhs'), Rhs),
	addSelectors(createYankPrevious('inner', 'rhs'), InnerRhs),
	addSelectors(createYankPrevious('outer', 'lhs'), Lhs),
	addSelectors(createYankPrevious('inner', 'lhs'), InnerLhs),
	addSelectors(
		withMatchFunc(createYankPrevious('outer', 'variable'), (_, matches) =>
			filterDuplicates(matches, ['declaration', 'variable'])
		),
		Variable
	),
	addSelectors(createYankPrevious('outer', 'string'), Str),
	addSelectors(withInnerStringModifier(createYankPrevious('inner', 'string')), InnerStr),
	addSelectors(
		withMatchFunc(createYankPrevious('outer', 'class'), (_, matches) => filterDuplicates(matches, 'class')),
		Class
	),
	addSelectors(createYankPrevious('inner', 'class'), InnerClass),
	addSelectors(createYankPrevious('outer', 'array'), selectOuterArray),
	addSelectors(createYankPrevious('inner', 'array'), InnerArray),
	addSelectors(
		withMatchFunc(createYankPrevious('outer', 'object'), function (ctx, matches) {
			assert(
				SupportedLanguages.includes(ctx.editor.language()),
				'trying to select in an unsupported language?'
			);

			if (ctx.editor.language() === 'c') {
				return filterDuplicates(matches, 'object');
			}
			return matches;
		}),
		OuterObject
	),
	addSelectors(createYankPrevious('inner', 'object'), InnerObject),

	addSelectors(withMatchFunc(createYankPrevious('outer', 'parameters'), groupMatches), Params),
	addSelectors(createYankPrevious('inner', 'parameters'), InnerParams),
	addSelectors(createYankPrevious('outer', 'call'), Call),
	addSelectors(createYankPrevious('inner', 'call'), InnerCall),
	addSelectors(createYankPrevious('outer', 'type'), Type),
	addSelectors(createYankPrevious('inner', 'type'), InnerType),
	addSelectors(createYankPrevious('outer', 'comment'), Comment),
	addSelectors(createYankPrevious('inner', 'comment'), InnerComment),
];

const changeNextcommands: Command[] = [
	addSelectors(
		withMatchFunc(createChangeNext('outer', 'function'), function (_, matches) {
			return filterDuplicates(matches, 'function');
		}),
		Function
	),
	addSelectors(withMatchFunc(createChangeNext('inner', 'function'), groupMatches), InnerFunction),
	addSelectors(createChangeNext('outer', 'loop'), Loop),
	addSelectors(withMatchFunc(createChangeNext('inner', 'loop'), groupMatches), InnerLoop),
	addSelectors(createChangeNext('outer', 'conditional'), Conditional),
	addSelectors(
		withMatchFunc(createChangeNext('inner', 'conditional'), function (ctx, matches) {
			const language = ctx.editor.language();
			if (
				//java && javascript
				!language.includes('java') &&
				//javascript, javascriptreact, typescript, typescriptreact
				!language.includes('script') &&
				!language.includes('python')
			) {
				return groupMatches(ctx, matches);
			}
			return matches;
		}),
		InnerConditional
	),
	addSelectors(createChangeNext('outer', 'rhs'), Rhs),
	addSelectors(createChangeNext('inner', 'rhs'), InnerRhs),
	addSelectors(createChangeNext('outer', 'lhs'), Lhs),
	addSelectors(createChangeNext('inner', 'lhs'), InnerLhs),
	addSelectors(
		withMatchFunc(createChangeNext('outer', 'variable'), (_, matches) =>
			filterDuplicates(matches, ['declaration', 'variable'])
		),
		Variable
	),
	addSelectors(createChangeNext('outer', 'string'), Str),
	addSelectors(withInnerStringModifier(createChangeNext('inner', 'string')), InnerStr),
	addSelectors(
		withMatchFunc(createChangeNext('outer', 'class'), (_, matches) => filterDuplicates(matches, 'class')),
		Class
	),
	addSelectors(createChangeNext('inner', 'class'), InnerClass),
	addSelectors(createChangeNext('outer', 'array'), selectOuterArray),
	addSelectors(createChangeNext('inner', 'array'), InnerArray),
	addSelectors(
		withMatchFunc(createChangeNext('outer', 'object'), function (ctx, matches) {
			assert(
				SupportedLanguages.includes(ctx.editor.language()),
				'trying to select in an unsupported language?'
			);

			if (ctx.editor.language() === 'c') {
				return filterDuplicates(matches, 'object');
			}
			return matches;
		}),
		OuterObject
	),
	addSelectors(createChangeNext('inner', 'object'), InnerObject),

	addSelectors(withMatchFunc(createChangeNext('outer', 'parameters'), groupMatches), Params),
	addSelectors(createChangeNext('inner', 'parameters'), InnerParams),
	addSelectors(createChangeNext('outer', 'call'), Call),
	addSelectors(createChangeNext('inner', 'call'), InnerCall),
	addSelectors(createChangeNext('outer', 'type'), Type),
	addSelectors(createChangeNext('inner', 'type'), InnerType),
	addSelectors(createChangeNext('outer', 'comment'), Comment),
	addSelectors(createChangeNext('inner', 'comment'), InnerComment),

	addSelectors(withMatchFunc(createChangeNext('outer', 'node'), FilterNodeDuplicates), Node),
	addSelectors(createChangePrevious('inner', 'node'), InnerNode),
];

const changePreviousCommand: Command[] = [
	addSelectors(
		withMatchFunc(createChangePrevious('outer', 'function'), function (_, matches) {
			return filterDuplicates(matches, 'function');
		}),
		Function
	),
	addSelectors(withMatchFunc(createChangePrevious('inner', 'function'), groupMatches), InnerFunction),
	addSelectors(createChangePrevious('outer', 'loop'), Loop),
	addSelectors(withMatchFunc(createChangePrevious('inner', 'loop'), groupMatches), InnerLoop),
	addSelectors(createChangePrevious('outer', 'conditional'), Conditional),
	addSelectors(
		withMatchFunc(createChangePrevious('inner', 'conditional'), function (ctx, matches) {
			const language = ctx.editor.language();
			if (
				//java && javascript
				!language.includes('java') &&
				//javascript, javascriptreact, typescript, typescriptreact
				!language.includes('script') &&
				!language.includes('python')
			) {
				return groupMatches(ctx, matches);
			}
			return matches;
		}),
		InnerConditional
	),
	addSelectors(createChangePrevious('outer', 'rhs'), Rhs),
	addSelectors(createChangePrevious('inner', 'rhs'), InnerRhs),
	addSelectors(createChangePrevious('outer', 'lhs'), Lhs),
	addSelectors(createChangePrevious('inner', 'lhs'), InnerLhs),
	addSelectors(
		withMatchFunc(createChangePrevious('outer', 'variable'), (_, matches) =>
			filterDuplicates(matches, ['declaration', 'variable'])
		),
		Variable
	),
	addSelectors(createChangePrevious('outer', 'string'), Str),
	addSelectors(withInnerStringModifier(createChangePrevious('inner', 'string')), InnerStr),
	addSelectors(
		withMatchFunc(createChangePrevious('outer', 'class'), (_, matches) =>
			filterDuplicates(matches, 'class')
		),
		Class
	),
	addSelectors(createChangePrevious('inner', 'class'), InnerClass),
	addSelectors(createChangePrevious('outer', 'array'), selectOuterArray),
	addSelectors(createChangePrevious('inner', 'array'), InnerArray),
	addSelectors(
		withMatchFunc(createChangePrevious('outer', 'object'), function (ctx, matches) {
			assert(
				SupportedLanguages.includes(ctx.editor.language()),
				'trying to select in an unsupported language?'
			);

			if (ctx.editor.language() === 'c') {
				return filterDuplicates(matches, 'object');
			}
			return matches;
		}),
		OuterObject
	),
	addSelectors(createChangePrevious('inner', 'object'), InnerObject),

	addSelectors(withMatchFunc(createChangePrevious('outer', 'parameters'), groupMatches), Params),
	addSelectors(createChangePrevious('inner', 'parameters'), InnerParams),
	addSelectors(createChangePrevious('outer', 'call'), Call),
	addSelectors(createChangePrevious('inner', 'call'), InnerCall),
	addSelectors(createChangePrevious('outer', 'type'), Type),
	addSelectors(createChangePrevious('inner', 'type'), InnerType),
	addSelectors(createChangePrevious('outer', 'comment'), Comment),
	addSelectors(createChangePrevious('inner', 'comment'), InnerComment),
];

//this could be better, i could make a Record<string, names> but rn i just want to see if it works
function FilterNodeDuplicates(ctx: Context, matches: QueryMatch[]) {
	const lang = ctx.editor.language();

	//javascript , typescript, javascriptreact, typescriptreact
	if (lang.includes('script')) {
		return filterDuplicates(matches, ['node', 'export']);
	}
	//java
	else if (lang.includes('java')) {
		return filterDuplicates(matches, ['node', 'inner']);
	} else if (lang.includes('cpp')) {
		return filterDuplicates(matches, ['node', 'expression', 'inner']);
	} else if (lang === 'go') {
		return filterDuplicates(matches, ['inner', 'outer', 'node']);
	} else if (lang === 'c') {
		return filterDuplicates(matches, 'node');
	}
	return matches;
}
export function getSelectNextCommands(): Command[] {
	return selectNextCommand;
}

export function getGotoNextStartCommands(): Command[] {
	return goToNextStartCommands;
}
export function getGoToPreviousCommands(): Command[] {
	return goToPreviousCommands;
}
export function getGoToPreviousEndCommands(): Command[] {
	return goToPreviousEndCommands;
}
export function getGoToNextEndCommands(): Command[] {
	return goToNextEndCommands;
}
export function getSelectPreviousCommands(): Command[] {
	return selectPreviousCommands;
}
export function getDeleteNextCommands(): Command[] {
	return deleteNextCommands;
}
export function getChangePreviousCommands(): Command[] {
	return changePreviousCommand;
}
export function getChangenextCommands(): Command[] {
	return changeNextcommands;
}
export function getYankPreviousCommands(): Command[] {
	return yankPreviousCommands;
}
export function getYankNextCommands(): Command[] {
	return yankNextCommands;
}

export function getDeletePreviousCommands(): Command[] {
	return deletePreviousCommands;
}
