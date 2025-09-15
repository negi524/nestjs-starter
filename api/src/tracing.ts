import {
  CompositePropagator,
  W3CTraceContextPropagator,
} from '@opentelemetry/core';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks';
import * as process from 'process';

const otelSDK = new NodeSDK({
  // metricReader: new PrometheusExporter({
  //   port: 8081,
  // }),
  // 生成されたスパンをバッファリングしてまとめてエクスポートする
  // この場合送信先はJaeger
  spanProcessor: new BatchSpanProcessor(new JaegerExporter()),
  // 非同期処理間で、現在のトレースコンテキストを引き回す仕組み(非同期コードでも正しくトレースIDを維持するために必要)
  contextManager: new AsyncLocalStorageContextManager(),
  // サービス間でトレース情報を伝播させる仕組み
  textMapPropagator: new CompositePropagator({
    propagators: [
      // new JaegerPropagator(),  // Jaeger固有フォーマット
      new W3CTraceContextPropagator(), // 標準規格
      // new W3CBaggagePropagator(), // 追加のメタデータを引き回すもの
    ],
  }),
  // HTTPやgRPCなどのライブラリに対して、自動でトレースを挿入する(自動でスパンが生成される)
  instrumentations: [getNodeAutoInstrumentations()],
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
