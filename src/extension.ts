import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { exec } from 'child_process';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('russian-hymn.playHymn', () => {
        playHymn(context);
    });
    context.subscriptions.push(disposable);
}

function playHymn(context: vscode.ExtensionContext) {
    /**
   * Воспроизводит гимн России в фоновом режиме.
   * Для вызова нажать комбинацию клавиш ctrl+shift+z ctrl+shift+v
   * Пример вызова: playHymn(context) - запускает воспроизведение гимна
   */
    const audioPath = path.join(context.extensionPath, 'sounds', 'hymn.mp3');
    
    if (!fs.existsSync(audioPath)) {
        vscode.window.showErrorMessage(`Audio file not found: ${audioPath}`);
        return;
    }

    if (process.platform === 'win32') {
        const command = `powershell -WindowStyle Hidden -Command "Add-Type -AssemblyName presentationCore; $player = New-Object System.Windows.Media.MediaPlayer; $player.Open('${audioPath.replace(/\\/g, '\\\\')}'); $player.Play(); Start-Sleep -Seconds 300"`;
        
        exec(command, (error) => {
            if (error) {
                vscode.window.showErrorMessage('Error playing audio: ' + error.message);
                vscode.env.openExternal(vscode.Uri.file(audioPath));
            } else {
                vscode.window.showInformationMessage('🎵 Russian Hymn playing in background!');
            }
        });
    } else {
        vscode.env.openExternal(vscode.Uri.file(audioPath));
        vscode.window.showInformationMessage('🎵 Opening Russian Hymn!');
    }
}

export function deactivate() {}