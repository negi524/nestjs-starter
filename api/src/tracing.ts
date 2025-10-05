import {
  CompositePropagator,
  W3CTraceContextPropagator,
} from '@opentelemetry/core';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { NodeSDK, logs } from '@opentelemetry/sdk-node';
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks';
import * as process from 'process';
import { PinoInstrumentation } from '@opentelemetry/instrumentation-pino';

const otelSDK = new NodeSDK({
  logRecordProcessor: new logs.SimpleLogRecordProcessor(
    new logs.ConsoleLogRecordExporter(),
  ),
  // 非同期処理間で、現在のトレースコンテキストを引き回す仕組み(非同期コードでも正しくトレースIDを維持するために必要)
  contextManager: new AsyncLocalStorageContextManager(),
  // サービス間でトレース情報を伝播させる仕組み
  textMapPropagator: new CompositePropagator({
    propagators: [
      new W3CTraceContextPropagator(), // 標準規格
    ],
  }),
  // HTTPやgRPCなどのライブラリに対して、自動でトレースを挿入する(自動でスパンが生成される)
  instrumentations: [
    getNodeAutoInstrumentations({
      // 不要なファイルシステム計装を無効化（ログのノイズ削減）
      '@opentelemetry/instrumentation-fs': {
        enabled: false,
      },
    }),
    new PinoInstrumentation(),
  ],
});

export default otelSDK;

// You can also use the shutdown method to gracefully shut down the SDK before process shutdown
// or on some operating system signal.
process.on('SIGTERM', () => {
  otelSDK
    .shutdown()
    .then(
      () => console.log('SDK shut down successfully'),
      (err) => console.log('Error shutting down SDK', err),
    )
    .finally(() => process.exit(0));
});
