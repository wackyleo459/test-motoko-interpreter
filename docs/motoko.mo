var value = 2;
actor Counter {

  var value = 1;

  public func inc() : async Nat {
    value += 1;
    return value;
  };
}

Counter.inc();

