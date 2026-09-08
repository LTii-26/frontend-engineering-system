import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { sleep } from "./sleep.js";


describe("sleep", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("returns a Promise", () => {
    expect(sleep(100)).toBeInstanceOf(Promise)
  })

  it("resolves after the given delay", async () => {
    let resolved = false
    const promise = sleep(1000).then(() => {
      resolved = true
    })

    expect(resolved).toBe(false)

    await vi.advanceTimersByTimeAsync(1000)
    await promise

    expect(resolved).toBe(true)
  })

  it("does not resolve before the delay elapses", async () => {
    let resolved = false
    const promise = sleep(1000).then(() => {
      resolved = true
    })

    await vi.advanceTimersByTimeAsync(999)
    expect(resolved).toBe(false)

    await vi.advanceTimersByTimeAsync(1)
    await promise
    expect(resolved).toBe(true)
  })

  it("resolves with undefined", async () => {
    const promise = sleep(100)
    await vi.advanceTimersByTimeAsync(100)

    await expect(promise).resolves.toBeUndefined()
  })

  it("resolves when ms is 0", async () => {
    const promise = sleep(0)
    await vi.advanceTimersByTimeAsync(0)

    await expect(promise).resolves.toBeUndefined()
  })
})
