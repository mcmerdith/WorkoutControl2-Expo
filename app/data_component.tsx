import { Suspense } from "react";

export default function DataComponent<T>({
  source,
  loading,
  component: renderer,
}: {
  source: Promise<T>;
  loading: JSX.Element;
  component: (data: T) => JSX.Element;
}) {
  return (
    <Suspense fallback={loading}>
      <ComponentRenderer provider={suspend(source)} renderer={renderer} />
    </Suspense>
  );
}

function ComponentRenderer<T>({
  provider,
  renderer,
}: {
  provider: () => T;
  renderer: (data: T) => JSX.Element;
}) {
  return renderer(provider());
}

function suspend<T>(promise: Promise<T>): () => T {
  let status: "pending" | "success" | "error" = "pending";
  let result: T;

  const suspender = new Promise<void>((resolve, reject) => {
    promise
      .then((r) => {
        status = "success";
        result = r;
        resolve();
      })
      .catch((e) => {
        status = "error";
        result = e;
        // <Suspend /> promises can never return anything
        // eslint-disable-next-line prefer-promise-reject-errors
        reject();
      });
  });

  // @ts-expect-error If the user passes a promise returning undefined then they know what they're getting into
  return () => {
    if (status === "pending") {
      throw suspender;
    } else if (status === "error") {
      throw result;
    } else if (status === "success") {
      return result;
    }
  };
}
