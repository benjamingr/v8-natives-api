'use strict';

require('v8').setFlagsFromString('--allow-natives-syntax');

// Extracted from v8/src/runtime/runtime.h
const methodNames = [
  'Abort',
  'AbortJS',
  'AbortCSAAssert',
  'ArraySpeciesProtector',
  'ClearFunctionFeedback',
  'ClearMegamorphicStubCache',
  'CompleteInobjectSlackTracking',
  'ConstructConsString',
  'ConstructDouble',
  'ConstructSlicedString',
  'DebugPrint',
  'DebugPrintPtr',
  'DebugTrace',
  'DebugTrackRetainingPath',
  'DeoptimizeFunction',
  'DeserializeWasmModule',
  'DisallowCodegenFromStrings',
  'DisallowWasmCodegen',
  'DisassembleFunction',
  'DynamicMapChecksEnabled',
  'EnableCodeLoggingForTesting',
  'EnsureFeedbackVectorForFunction',
  'FreezeWasmLazyCompilation',
  'GetCallable',
  'GetInitializerFunction',
  'GetOptimizationStatus',
  'GetUndetectable',
  'GetWasmExceptionId',
  'GetWasmExceptionValues',
  'GetWasmRecoveredTrapCount',
  'GlobalPrint',
  'HasDictionaryElements',
  'HasDoubleElements',
  'HasElementsInALargeObjectSpace',
  'HasFastElements',
  'HasFastProperties',
  'HasFixedBigInt64Elements',
  'HasFixedBigUint64Elements',
  'HasFixedFloat32Elements',
  'HasFixedFloat64Elements',
  'HasFixedInt16Elements',
  'HasFixedInt32Elements',
  'HasFixedInt8Elements',
  'HasFixedUint16Elements',
  'HasFixedUint32Elements',
  'HasFixedUint8ClampedElements',
  'HasFixedUint8Elements',
  'HasHoleyElements',
  'HasObjectElements',
  'HasPackedElements',
  'HasSloppyArgumentsElements',
  'HasSmiElements',
  'HasSmiOrObjectElements',
  'HaveSameMap',
  'HeapObjectVerify',
  'ICsAreEnabled',
  'InYoungGeneration',
  'IsAsmWasmCode',
  'IsBeingInterpreted',
  'IsConcurrentRecompilationSupported',
  'IsLiftoffFunction',
  'IsThreadInWasm',
  'IsWasmCode',
  'IsWasmTrapHandlerEnabled',
  'RegexpHasBytecode',
  'RegexpHasNativeCode',
  'RegexpTypeTag',
  'MapIteratorProtector',
  'NeverOptimizeFunction',
  'NotifyContextDisposed',
  'OptimizeFunctionOnNextCall',
  'OptimizeOsr',
  'NewRegExpWithBacktrackLimit',
  'PrepareFunctionForOptimization',
  'PrintWithNameForAssert',
  'RunningInSimulator',
  'RuntimeEvaluateREPL',
  'SerializeDeserializeNow',
  'SerializeWasmModule',
  'SetAllocationTimeout',
  'SetForceSlowPath',
  'SetIteratorProtector',
  'SetWasmCompileControls',
  'SetWasmInstantiateControls',
  'SetWasmThreadsEnabled',
  'SimulateNewspaceFull',
  'StringIteratorProtector',
  'SystemBreak',
  'TraceEnter',
  'TraceExit',
  'TurbofanStaticAssert',
  'UnblockConcurrentRecompilation',
  'WasmGetNumberOfInstances',
  'WasmNumCodeSpaces',
  'WasmTierDownModule',
  'WasmTierUpFunction',
  'WasmTierUpModule',
  'WasmTraceEnter',
  'WasmTraceExit',
  'WasmTraceMemory',
  'DeoptimizeNow',
  // Strings
  'FlattenString',
  'GetSubstitution',
  'InternalizeString',
  'StringAdd',
  'StringBuilderConcat',
  'StringCharCodeAt',
  'StringEqual',
  'StringEscapeQuotes',
  'StringGreaterThan',
  'StringGreaterThanOrEqual',
  'StringIncludes',
  'StringIndexOf',
  'StringIndexOfUnchecked',
  'StringLastIndexOf',
  'StringLessThan',
  'StringLessThanOrEqual',
  'StringMaxLength',
  'StringReplaceOneCharWithString',
  'StringCompareSequence',
  'StringSubstring',
  'StringToArray',
  'StringTrim',
];
let api = {};

for (const method of methodNames) {
  api[method] = function wrappedBuiltin(...args) {
    if (!api[method].runtimeFunction[args.length]) {
      let innerArgs = args.map((_, i) => 'a' + i);
      api[method].runtimeFunction[args.length] =
      Function(...innerArgs, `return %${method}(${innerArgs.join(',')})`);
    }
    let fn = api[method].runtimeFunction[args.length];
    try {
      return fn(...args);
    } catch (e) {
      require('v8').setFlagsFromString('--allow-natives-syntax');
      return fn(...args);
    }
  };
  api[method].runtimeFunction = [];
}

module.exports = api;