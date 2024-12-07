import { describe, it, expect, vi, beforeEach } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom/vitest';
import React from 'react'
import App from '../../../src/App.tsx'

beforeEach(() => {
    cleanup();
});

vi.mock('../../../src/hooks/useCounter.ts', async () => {
    // mock作成処理中にactual.useCounter()は実行できない。Reactではなくvitestの環境内のため
    const actual = await vi.importActual<typeof import('../../../src/hooks/useCounter.ts')>('../../../src/hooks/useCounter.ts');

    return {
        useCounter: () => {
            // mockしたuseCounterが実行されると、事前にimportした実際のuseCounterが実行される
            // 実行された実際の結果を使用することで、部分的な書き換えを行うことができる
            const originalHook = actual.useCounter();
            return {
                ...originalHook,
                increase: vi.fn() // mockしたい部分だけ置き換える
            };
        }
    };
});

// // userインスタンスのセットアップ
const user = userEvent.setup();

// mockはファイル全体に影響するので、spyとファイルを分ける
describe('React Hooksのmockサンプル', () => {
    it("React Hooksをmockする", async () => {
        // 準備
        // 実行
        render(<App />)
        await user.click(screen.getByRole("button", { name: /increase/ }))

        // 検証
        await waitFor(() => expect(screen.getByText('count is 0')).toBeInTheDocument())
    })
    it("React Hooksの一部だけmockできる", async () => {
        // 準備
        // 実行
        render(<App />)
        await user.click(screen.getByRole("button", { name: /decrease/ }))

        // 検証
        // decrease関数はmock化していないのでcountが減少する
        await waitFor(() => expect(screen.getByText('count is -1')).toBeInTheDocument())
    })
})
