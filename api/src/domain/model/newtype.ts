declare const brand: unique symbol;
export type Newtype<Constructor, Type> = Type & {
  readonly [brand]: Constructor;
};
