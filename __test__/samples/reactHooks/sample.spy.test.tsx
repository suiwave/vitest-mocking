import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import React from 'react'

import App from '../../../src/App.tsx'
import * as CounterHooks from '../../../src/hooks/useCounter.ts';

// userインスタンスのセットアップ
const user = userEvent.setup();

describe('React Hooksのspyサンプル', () => {
    describe("React Hooksをspyする", () => {
        it("spyして関数の利用のされかたを追跡する", async () => {
            // 準備
            // spy変数を作成する
            // hooksはうまいことspyできなかった・・・。mock化するか、useCounter関数自体をspyするしかなさそう？
            const useCounterSpy = vi.spyOn(CounterHooks, "useCounter");
            const decreaseSpy = vi.fn();

            // spyを埋め込む
            useCounterSpy.mockReturnValue({
                count: 0,
                increase: vi.fn(),
                decrease: decreaseSpy, // spy化したdecrease関数
            });

            // 実行
            render(<App />)

            await user.click(screen.getByRole("button", { name: /decrease/ }))

            // 検証
            // 対象の関数が実行されたことを検証
            expect(decreaseSpy).toHaveBeenCalled()
            expect(decreaseSpy).toHaveBeenCalledOnce()
            expect(decreaseSpy).toHaveBeenCalledTimes(1)
        })
    })
})
