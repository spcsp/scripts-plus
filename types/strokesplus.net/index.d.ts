/**
* This file was generated by parsing the output of sp.GetMethods()
*/
declare namespace Microsoft {
  namespace Win32 {
  interface RegistryKey {}
  }

  namespace Forms {
  interface MouseButtons {}
  }
}

declare namespace WindowsInput.Native {
  interface VirtualKeyCode {}
}

declare namespace ManagedWinapi.Windows {
  interface SystemWindow {}
}

declare namespace System {
  type Object = any;
  type Int16 = number;
  type Int32 = number;
  type UInt32 = number;
  type IntPtr = number;
  type String = string;
  type Boolean = boolean;

  namespace Drawing {
  interface Image {}
  interface Point {}
  interface Rectangle {}
  interface RectRegion {}
  }

  namespace Windows.Forms {
  interface MouseButtons {}
  }

  interface SystemWindow {}
}

declare namespace StrokesPlus {
  namespace net.Engine {
  interface InputBoxInfo {}
  interface SystemWindow {}
  interface HistoryScript {}
  interface PopupMenuInfo {}
  interface PopupMenuInfoEx {}
  interface DisplayTextInfo {}
  interface CoreAudioDevice {}
  }
}

// Unknown Base Types
declare type Timer = any;
declare type Color = any;
declare type MethodInfo = any;

declare interface Sp {
  Add(number1: number, number2: number): number;
  AllApplications(): StrokesPlus.net.Engine.SystemWindow[];
  AllWindows(): StrokesPlus.net.Engine.SystemWindow[];
  AppendText(sourceText: System.String, addText: System.String): System.String;
  Break(): void;
  BreakIf(value1: System.Object, value2: System.Object): boolean;
  BreakIfExpression(expression: System.String): boolean;
  ChangeCulture(cultureName: System.String): boolean;
  ClearStack(): void;
  CloseHandle(handle: System.IntPtr): boolean;
  CloseSettings(savePendingChanges: System.Boolean): void;
  CloseWindow(window: ManagedWinapi.Windows.SystemWindow): void;
  ConsumePhysicalInput(active: System.Boolean): void;
  ContainsRegex(sourceText: System.String, regularExpression: System.String): boolean;
  ContainsText(sourceText: System.String, searchText: System.String): boolean;
  ConvertToType(value: System.Object, newType: System.String): Object;
  CreateTimer(name: System.String, startdelay: System.Int32, interval: System.Int32, script: System.String): Timer;
  Delay(milliseconds: System.Int32): void;
  DeleteAllTimers(): void;
  DeleteStoredBool(name: System.String): void;
  DeleteStoredHandle(name: System.String): void;
  DeleteStoredHistoryScript(name: System.String): void;
  DeleteStoredNumber(name: System.String): void;
  DeleteStoredObject(name: System.String): void;
  DeleteStoredPoint(name: System.String): void;
  DeleteStoredRectangle(name: System.String): void;
  DeleteStoredString(name: System.String): void;
  DeleteTimer(name: System.String): void;
  DesktopWindow(): StrokesPlus.net.Engine.SystemWindow;
  DesktopWindowListView(): StrokesPlus.net.Engine.SystemWindow;
  DestroyCursors(): void;
  Disable(): void;
  DisableCapture(): void;
  DisableNext(): void;
  DisplayImage(image: System.Drawing.Image, allowScrollZooming: System.Boolean): void;
  DisplayText(point: System.Drawing.Point, title: System.String, message: System.String, millisecondsToShow: System.Int32, backgroundColor: System.String, textColor: System.String, opacity: System.String): void;
  DisplayText(info: StrokesPlus.net.Engine.DisplayTextInfo): void;
  DisplayTextClose(): void;
  DisplayTextUpdate(info: StrokesPlus.net.Engine.DisplayTextInfo): void;
  Divide(number1: number, number2: number): number;
  Else(): void;
  ElseIf(value1: System.Object, value2: System.Object): boolean;
  ElseIfExpression(expression: System.String): boolean;
  EmptyRecycleBins(): void;
  Enable(): void;
  EnableCapture(): void;
  EndIf(): void;
  EndLoop(): void;
  // EngineList(): List;
  // Evaluate(expression: System.String, stack: System.Collections.Generic.Stack`1[System.Object]): Double;
  // EvaluateAsBoolean(expression: System.String, stack: System.Collections.Generic.Stack`1[System.Object]): boolean;
  ExecutePreviousScript(index: System.Int32): void;
  // ExecuteSteps(actionVars: StrokesPlus.net.Hooks.HookState+ActionVars, wheelTick: StrokesPlus.net.Code.WinAPIFunctions+WheelTick, click: StrokesPlus.net.Code.WinAPIFunctions+Click, floater: StrokesPlus.net.Hooks.HookState+FloaterVars, steps: System.Collections.Generic.IEnumerable`1[StrokesPlus.net.Code.ActionStep]): void;
  ExecuteStoredScript(name: System.String): void;
  Exit(): void;
  ExpandEnvironmentVariables(stringToExpand: System.String): System.String;
  ExplorerGetCurrentPath(explorerWindow: ManagedWinapi.Windows.SystemWindow): System.String;
  ExplorerGetItems(explorerWindow: ManagedWinapi.Windows.SystemWindow, onlyNames: System.Boolean, includeFolders: System.Boolean, includeLinks: System.Boolean): String[];
  ExplorerGetSelectedDesktopFiles(): String[];
  ExplorerGetSelectedFiles(explorerWindow: ManagedWinapi.Windows.SystemWindow): String[];
  FindWindow(lpszClass: System.String, lpszWindow: System.String): System.IntPtr;
  FindWindowEx(hwndParent: System.IntPtr, hwndChildAfter: System.IntPtr, lpszClass: System.String, lpszWindow: System.String): System.IntPtr;
  ForegroundWindow(): StrokesPlus.net.Engine.SystemWindow;
  get_KeyboardCaptureEnabled(): boolean;
  get_ManualCaptureOnly(): boolean;
  get_MouseCaptureEnabled(): boolean;
  get_PopupMenuInfo(): StrokesPlus.net.Engine.PopupMenuInfo;
  get_PopupMenuInfoEx(): StrokesPlus.net.Engine.PopupMenuInfoEx;
  GetActiveExplorerPath(hWnd: System.IntPtr): System.String;
  GetAllScreens(): Screen[];
  GetArrayItemByIndex(array: System.Object[], index: System.Int32): Object;
  GetArrayItemCount(array: System.Object[]): System.Int32;
  GetBlueValueFromColor(color: string): System.Int32;
  GetBoolean(value: System.Boolean): boolean;
  GetCaptureMixer(): StrokesPlus.net.Engine.CoreAudioDevice;
  GetClipboardText(): System.String;
  GetColorFromHex(hexColor: System.String): Color;
  GetColorFromRGB(red: System.String, green: System.String, blue: System.String): Color;
  GetCommunicationsCaptureMixer(): StrokesPlus.net.Engine.CoreAudioDevice;
  GetCommunicationsMixer(): StrokesPlus.net.Engine.CoreAudioDevice;
  GetCommunicationsVolume(): System.Int32;
  GetControlFromPoint(point: System.Drawing.Point): StrokesPlus.net.Engine.SystemWindow;
  GetControlFromPointXY(X: System.Int32, Y: System.Int32): StrokesPlus.net.Engine.SystemWindow;
  GetCurrentCulture(): System.String;
  GetCurrentMouseCursor(): System.String;
  GetCurrentMousePoint(): System.Drawing.Point;
  GetExeType(file: System.String): unknown;
  GetFileProductVersionInfo(filePath: System.String): System.String;
  GetFileVersionInfo(filePath: System.String): System.String;
  GetFirstMoveableParentFromPoint(point: System.Drawing.Point): StrokesPlus.net.Engine.SystemWindow;
  GetFirstMoveableParentFromPointXY(X: System.Int32, Y: System.Int32): StrokesPlus.net.Engine.SystemWindow;
  GetFullPathFromWindows(exeName: System.String): System.String;
  GetGreenValueFromColor(color: string): System.Int32;
  GetHistoryScript(index: System.Int32): StrokesPlus.net.Engine.HistoryScript;
  GetItemsInExplorer(hWnd: System.IntPtr, onlyNames: System.Boolean, includeFolders: System.Boolean, includeLinks: System.Boolean): String[];
  GetKeyState(vk: WindowsInput.Native.VirtualKeyCode): System.Int16;
  GetLastError(): System.UInt32;
  GetMacroScript(category: System.String, name: System.String): System.String;
  GetMethod(name: System.String): MethodInfo;
  GetMethods(): MethodInfo[];
  GetNumber(value: System.Int32): System.Int32;
  GetNumberOfItemsOnStack(): void;
  GetObjectPropertyByName(sourceObject: System.Object, propertyName: System.String): Object;
  GetPixelColorFromPoint(point: System.Drawing.Point): Color;
  GetPlaybackMixer(): StrokesPlus.net.Engine.CoreAudioDevice;
  GetPlaybackVolume(): System.Int32;
  GetPoint(X: System.Int32, Y: System.Int32): System.Drawing.Point;
  GetRectangle(X: System.Int32, Y: System.Int32, width: System.Int32, height: System.Int32): System.Drawing.Rectangle;
  GetRedValueFromColor(color: string): System.Int32;
  GetRegionFromPoint(rectangle: System.Drawing.Rectangle, point: System.Drawing.Point, columns: System.Int32, rows: System.Int32): System.Drawing.RectRegion;
  GetRegions(rect: System.Drawing.Rectangle, columns: System.Int32, rows: System.Int32): System.Drawing.RectRegion[];
  GetScreenFromHandle(handle: System.IntPtr): Screen;
  GetScreenFromPoint(point: System.Drawing.Point): Screen;
  GetScreenFromPointXY(X: System.Int32, Y: System.Int32): Screen;
  GetScreenFromRectangle(rectangle: System.Drawing.Rectangle): Screen;
  GetSelectedFilesInExplorer(hWnd: System.IntPtr): String[];
  GetSelectedFilesOnDesktop(): String[];
  GetStoredBool(name: System.String): boolean;
  GetStoredHandle(name: System.String): System.IntPtr;
  GetStoredHistoryScript(name: System.String): StrokesPlus.net.Engine.HistoryScript;
  GetStoredNumber(name: System.String): number;
  GetStoredObject(name: System.String): Object;
  GetStoredPoint(name: System.String): System.Drawing.Point;
  GetStoredRectangle(name: System.String): System.Drawing.Rectangle;
  GetStoredString(name: System.String): System.String;
  GetString(value: System.String): System.String;
  GetSyncKeyState(vk: WindowsInput.Native.VirtualKeyCode): System.Int16;
  GetSystemMetricsByIndex(index: System.Int32): System.Int32;
  GetTemporaryMacroScript(): System.String;
  GetTextLength(sourceText: System.String): System.Int32;
  GetTimer(name: System.String): Timer;
  GetTimerScript(name: System.String): System.String;
  GetTopLevelWindowFromPoint(point: System.Drawing.Point): StrokesPlus.net.Engine.SystemWindow;
  GetTopLevelWindowFromPointXY(X: System.Int32, Y: System.Int32): StrokesPlus.net.Engine.SystemWindow;
  GetWindowClassName(window: ManagedWinapi.Windows.SystemWindow): System.String;
  GetWindowHeight(window: ManagedWinapi.Windows.SystemWindow): System.Int32;
  GetWindowLocation(window: ManagedWinapi.Windows.SystemWindow): System.Drawing.Point;
  GetWindowLocationX(window: ManagedWinapi.Windows.SystemWindow): System.Int32;
  GetWindowLocationY(window: ManagedWinapi.Windows.SystemWindow): System.Int32;
  GetWindowMainModuleFileName(window: ManagedWinapi.Windows.SystemWindow): System.String;
  GetWindowMainModuleFilePath(window: ManagedWinapi.Windows.SystemWindow): System.String;
  GetWindowRectangle(window: ManagedWinapi.Windows.SystemWindow): System.Drawing.Rectangle;
  GetWindowRectangleFull(window: ManagedWinapi.Windows.SystemWindow): System.Drawing.Rectangle;
  GetWindowText(window: ManagedWinapi.Windows.SystemWindow): System.String;
  GetWindowThreadProcessId(hWnd: System.IntPtr, dwProcessId: System.UInt32): System.UInt32;
  GetWindowWidth(window: ManagedWinapi.Windows.SystemWindow): System.Int32;
  HideMouseCursor(): void;
  HTMLWindow(Title: System.String, HTML: System.String, ScriptCallback: System.String, OnDocumentCreatedScript: System.String, ID: System.String, IncludeBootstrapJQuery: System.Boolean): void;
  HTMLWindowExecuteScriptAsync(Handle: System.Object, Script: System.String): void;
  If(value1: System.Object, value2: System.Object): boolean;
  IfExpression(expression: System.String): boolean;
  InputBox(title: System.String, message: System.String, itemList: System.String, sortItems: System.Boolean, selectedItem: System.String, allowDirectInput: System.Boolean): System.String;
  InputBox(info: StrokesPlus.net.Engine.InputBoxInfo): System.String;
  InvokeObjectMethodByName(sourceObject: System.Object, methodName: System.String, objMethodParameters: System.Object[]): Object;
  InvokeScriptMethod(parameters: System.Object[], name: System.String): Object;
  IsAppCommandKey(virtualKey: WindowsInput.Native.VirtualKeyCode): boolean;
  IsKeyToggled(vk: WindowsInput.Native.VirtualKeyCode): boolean;
  IsWindowAlwaysOnTop(window: ManagedWinapi.Windows.SystemWindow): boolean;
  IsWindowMaximized(window: ManagedWinapi.Windows.SystemWindow): boolean;
  IsWindowMinimized(window: ManagedWinapi.Windows.SystemWindow): boolean;
  LastActiveWindow(): StrokesPlus.net.Engine.SystemWindow;
  LastApplication(): void;
  LastFocusControl(): StrokesPlus.net.Engine.SystemWindow;
  LockWorkStation(): boolean;
  // Loop(numberOfLoops: System.Int32, actionVars: StrokesPlus.net.Hooks.HookState+ActionVars, wheelTick: StrokesPlus.net.Code.WinAPIFunctions+WheelTick, click: StrokesPlus.net.Code.WinAPIFunctions+Click, floater: StrokesPlus.net.Hooks.HookState+FloaterVars, steps: System.Collections.Generic.List`1[StrokesPlus.net.Code.ActionStep], stack: System.Collections.Generic.Stack`1[System.Object], success: System.Boolean, stopIssued: System.Boolean): void;
  MaximizeOrRestoreWindow(window: ManagedWinapi.Windows.SystemWindow): void;
  MaximizeWindow(window: ManagedWinapi.Windows.SystemWindow): void;
  MessageBox(message: System.Object, title: System.Object): void;
  MinimizeWindow(window: ManagedWinapi.Windows.SystemWindow): void;
  MouseClick(point: System.Drawing.Point, button: System.String, down: System.Boolean, up: System.Boolean): void;
  MouseClick(pt: System.Drawing.Point, btn: System.Windows.Forms.MouseButtons, down: System.Boolean, up: System.Boolean): void;
  MouseClickXY(X: System.Int32, Y: System.Int32, button: System.String, down: System.Boolean, up: System.Boolean): void;
  MouseMove(point: System.Drawing.Point): void;
  MouseMoveXY(X: System.Int32, Y: System.Int32): void;
  MouseRestrictActive(): boolean;
  MouseRestrictClear(): void;
  MouseRestrictToRectangle(rectangle: System.Drawing.Rectangle): void;
  MouseWheel(point: System.Drawing.Point, horizontal: System.Boolean, delta: System.Object): void;
  MouseWheelXY(X: System.Int32, Y: System.Int32, horizontal: System.Boolean, delta: System.Object): void;
  MoveWindowToNextScreen(window: ManagedWinapi.Windows.SystemWindow): Screen;
  MoveWindowToPreviousScreen(window: ManagedWinapi.Windows.SystemWindow): Screen;
  MoveWindowToScreen(window: ManagedWinapi.Windows.SystemWindow, screenNumber: System.Object): Screen;
  Multiply(number1: number, number2: number): number;
  // NativeDelegate(functionName: System.String, parameterTypes: System.Object, returnType: System.Type): System.IntPtr;
  // NativeDelegateList(delegateList: System.Object): List;
  // NativeModule(moduleName: System.String): ModuleBuilder;
  NextApplication(): void;
  OpenProcess(dwDesiredAccess: System.UInt32, bInheritHandle: System.Boolean, dwProcessId: System.UInt32): System.IntPtr;
  OpenSettings(): void;
  OpenURL(url: System.String): void;
  Pause(seconds: System.Int32): void;
  PlaySavedMacro(macroName: System.String): void;
  PlaySound(filePath: System.String): void;
  PlayTemporaryMacro(): void;
  ReadProcessMemory(hProcess: System.IntPtr, lpBaseAddress: System.IntPtr, lpBuffer: System.IntPtr, nSize: System.Int32, vNumberOfBytesRead: System.UInt32): boolean;
  RecordTemporaryMacro(): void;
  RefreshNativeModules(): void;
  RegistryDelete(baseKey: Microsoft.Win32.RegistryKey, subKey: System.String, keyName: System.String, showErrors: System.Boolean): boolean;
  RegistryDeleteSubKey(baseKey: Microsoft.Win32.RegistryKey, subKey: System.String, showErrors: System.Boolean): boolean;
  RegistryReadMultiString(baseKey: Microsoft.Win32.RegistryKey, subKey: System.String, keyName: System.String, showErrors: System.Boolean): String[];
  RegistryReadNumber(baseKey: Microsoft.Win32.RegistryKey, subKey: System.String, keyName: System.String, showErrors: System.Boolean): System.Int32;
  RegistryReadString(baseKey: Microsoft.Win32.RegistryKey, subKey: System.String, keyName: System.String, showErrors: System.Boolean): System.String;
  RegistryWrite(baseKey: Microsoft.Win32.RegistryKey, keyName: System.String, keyValue: System.String, value: System.Object, kind: System.String, showErrors: System.Boolean): boolean;
  RelayGesture(points: System.Drawing.Point[], button: System.Windows.Forms.MouseButtons): void;
  Reload(): void;
  ReloadScriptEnginePool(): void;
  RemoveItemsFromStack(numberOfItems: System.Int32): void;
  ReplaceText(sourceText: System.String, oldText: System.String, newText: System.String): System.String;
  RestoreWindow(window: ManagedWinapi.Windows.SystemWindow): void;
  Run(command: System.String): void;
  RunOrActivate(exeName: System.String): void;
  RunProgram(fileName: System.String, arguments: System.String, verb: System.String, windowStyle: System.String, useShellExecute: System.Boolean, noWindow: System.Boolean, waitForExit: System.Boolean): System.Int32;
  RunStoreApp(packageName: System.String): void;
  SendAltDown(): void;
  SendAltUp(): void;
  SendAppCommand(virtualKey: WindowsInput.Native.VirtualKeyCode): boolean;
  SendCharacter(ch: System.String): void;
  SendControlDown(): void;
  SendControlUp(): void;
  // SendHotKey(hotkey: StrokesPlus.net.Engine.ActionFunctions+StepHotkey): void;
  SendKeyDown(ch: System.String): void;
  SendKeys(sendKeysString: System.String): void;
  SendKeyUp(ch: System.String): void;
  SendMessage(hWnd: System.IntPtr, Msg: System.UInt32, wParam: System.Int32, lParam: System.Int32): System.Int32;
  SendModifiedVKeys(Modifiers: System.Object, Keys: System.Object): void;
  SendShiftDown(): void;
  SendShiftUp(): void;
  SendString(characters: System.String): void;
  SendUnicodeString(str: System.String): void;
  SendVKey(virtualKey: WindowsInput.Native.VirtualKeyCode): void;
  SendVKeyDown(virtualKey: WindowsInput.Native.VirtualKeyCode): void;
  SendVKeyUp(virtualKey: WindowsInput.Native.VirtualKeyCode): void;
  SendWinDown(): void;
  SendWinUp(): void;
  set_KeyboardCaptureEnabled(value: System.Boolean): void;
  set_ManualCaptureOnly(value: System.Boolean): void;
  set_MouseCaptureEnabled(value: System.Boolean): void;
  set_PopupMenuInfo(value: StrokesPlus.net.Engine.PopupMenuInfo): void;
  set_PopupMenuInfoEx(value: StrokesPlus.net.Engine.PopupMenuInfoEx): void;
  SetClipboardText(text: System.String): void;
  SetCommunicationsVolume(newVolumeLevel: System.Int32): void;
  SetForegroundWindow(window: ManagedWinapi.Windows.SystemWindow): void;
  SetMouseCursor(cursorType: System.String, fileName: System.String): void;
  SetObjectPropertyByName(sourceObject: System.Object, propertyName: System.String, value: System.Object): void;
  SetPlaybackVolume(newVolumeLevel: System.Int32): void;
  SetWindowAlwaysOnTop(window: ManagedWinapi.Windows.SystemWindow, newValue: System.Boolean): void;
  SetWindowHeight(window: ManagedWinapi.Windows.SystemWindow, height: System.Int32): void;
  SetWindowLocation(window: ManagedWinapi.Windows.SystemWindow, point: System.Drawing.Point): void;
  SetWindowLocationXY(window: ManagedWinapi.Windows.SystemWindow, X: System.Int32, Y: System.Int32): void;
  SetWindowSize(window: ManagedWinapi.Windows.SystemWindow, width: System.Int32, height: System.Int32): void;
  SetWindowWidth(window: ManagedWinapi.Windows.SystemWindow, width: System.Int32): void;
  // SHGetFileInfo(pszPath: System.String, dwFileAttributes: System.UInt32, psfi: StrokesPlus.net.Engine.ActionFunctions+SHFILEINFO, cbSizeFileInfo: System.UInt32, uFlags: System.UInt32): System.IntPtr;
  ShowBalloonTip(title: System.String, text: System.String, icon: System.String, timeout: System.Object): void;
  ShowMouseCursor(): void;
  ShowPopupMenu(info: StrokesPlus.net.Engine.PopupMenuInfo): void;
  ShowPopupMenuEx(info: StrokesPlus.net.Engine.PopupMenuInfoEx): void;
  Sleep(milliseconds: System.Int32): void;
  StartManualCapture(useSecondaryStrokeButton: System.Boolean): boolean;
  Stop(): void;
  StopAllActionSteps(): void;
  StopAllScripts(): void;
  StopManualCapture(): boolean;
  StoreBool(name: System.String, value: System.Boolean): void;
  StoreHandle(name: System.String, value: System.IntPtr): void;
  StoreHistoryScript(name: System.String, value: StrokesPlus.net.Engine.HistoryScript): void;
  StoreNumber(name: System.String, value: number): void;
  StoreObject(name: System.String, value: System.Object): void;
  StorePoint(name: System.String, value: System.Drawing.Point): void;
  StoreRectangle(name: System.String, value: System.Drawing.Rectangle): void;
  StoreString(name: System.String, value: System.String): void;
  Subtract(number1: number, number2: number): number;
  ToggleCommunicationsMute(): void;
  TogglePlaybackMute(): void;
  ToggleTrayIcon(): void;
  ToggleWindowAlwaysOnTop(window: ManagedWinapi.Windows.SystemWindow): void;
  TouchFloaterCloseCustomFloater(floaterName: System.String): void;
  TouchFloaterHide(): void;
  TouchFloaterIsCustomFloaterLoaded(floaterName: System.String): boolean;
  TouchFloaterIsShown(): boolean;
  TouchFloaterLoadCustomFloater(floaterName: System.String): void;
  TouchFloaterLoadLayout(layoutName: System.String): void;
  TouchFloaterSetCustomFloaterKeyMode(floaterName: System.String, enabled: System.Boolean): void;
  TouchFloaterSetCustomFloaterLocation(floaterName: System.String, point: System.Drawing.Point): void;
  TouchFloaterSetCustomFloaterOpacity(floaterName: System.String, opacity: number): void;
  TouchFloaterSetCustomFloaterSize(floaterName: System.String, size: System.Int32): void;
  TouchFloaterSetCustomFloaterText(floaterName: System.String, text: System.String): void;
  TouchFloaterSetCustomFloaterTextColor(floaterName: System.String, color: string): void;
  TouchFloaterSetLocation(point: System.Drawing.Point): void;
  TouchFloaterShow(): void;
  TouchFloatersReset(): void;
  TouchFloaterToggle(): void;
  TouchFloaterToggleOthers(): void;
  TraceLogEntry(message: System.String): void;
  VirtualAllocEx(hProcess: System.IntPtr, lpAddress: System.IntPtr, dwSize: System.UInt32, flAllocationType: System.UInt32, flProtect: System.UInt32): System.IntPtr;
  VirtualFreeEx(hProcess: System.IntPtr, lpAddress: System.IntPtr, dwSize: System.UInt32, dwFreeType: System.UInt32): boolean;
  WindowFromClassOrTitle(className: System.String, windowTitle: System.String): StrokesPlus.net.Engine.SystemWindow;
  WindowFromHandle(handle: System.IntPtr): StrokesPlus.net.Engine.SystemWindow;
  WindowFromPoint(pt: System.Drawing.Point, topLevelOnly: System.Boolean): StrokesPlus.net.Engine.SystemWindow;
  WindowsFromTitlePartial(partialTitle: System.String): StrokesPlus.net.Engine.SystemWindow[];
  WindowsFromTitleRegex(regexTitle: System.String): StrokesPlus.net.Engine.SystemWindow[];
  WriteProcessMemory(hProcess: System.IntPtr, lpBaseAddress: System.IntPtr, lpBuffer: System.IntPtr, nSize: System.Int32, vNumberOfBytesRead: System.UInt32): boolean;
}

declare const sp:Sp;
