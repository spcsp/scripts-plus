﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ScriptsPlusPlugin.Properties {
    using System;
    
    
    /// <summary>
    ///   A strongly-typed resource class, for looking up localized strings, etc.
    /// </summary>
    // This class was auto-generated by the StronglyTypedResourceBuilder
    // class via a tool like ResGen or Visual Studio.
    // To add or remove a member, edit your .ResX file then rerun ResGen
    // with the /str option, or rebuild your VS project.
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("System.Resources.Tools.StronglyTypedResourceBuilder", "16.0.0.0")]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
    [global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    public class Resources {
        
        private static global::System.Resources.ResourceManager resourceMan;
        
        private static global::System.Globalization.CultureInfo resourceCulture;
        
        [global::System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode")]
        internal Resources() {
        }
        
        /// <summary>
        ///   Returns the cached ResourceManager instance used by this class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        public static global::System.Resources.ResourceManager ResourceManager {
            get {
                if (object.ReferenceEquals(resourceMan, null)) {
                    global::System.Resources.ResourceManager temp = new global::System.Resources.ResourceManager("ScriptsPlusPlugin.Properties.Resources", typeof(Resources).Assembly);
                    resourceMan = temp;
                }
                return resourceMan;
            }
        }
        
        /// <summary>
        ///   Overrides the current thread's CurrentUICulture property for all
        ///   resource lookups using this strongly typed resource class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        public static global::System.Globalization.CultureInfo Culture {
            get {
                return resourceCulture;
            }
            set {
                resourceCulture = value;
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to function bootstrap(config) {
        ///  const { Directory, File, Path } = clr.System.IO;
        ///  const { GetFolderPath, SpecialFolder } = clr.System.Environment
        ///  
        ///  const fromRoot = p =&gt; Path.Combine(config.root, p);
        ///  const expandVar = v =&gt; sp.ExpandEnvironmentVariables(`%${v}%`);  
        ///  const specialFolder = n =&gt; GetFolderPath(SpecialFolder[n]);
        ///  
        ///  const env = {
        ///    ROOT: config.root,
        ///    USER_PROFILE: specialFolder(&quot;UserProfile&quot;),
        ///    WINDIR: expandVar(&quot;WINDIR&quot;),
        ///    HOSTNAME: expandVar(&quot;ComputerName&quot;),
        ///    SYSTEM_ROOT [rest of string was truncated]&quot;;.
        /// </summary>
        public static string BOOTSTRAP_SRC {
            get {
                return ResourceManager.GetString("BOOTSTRAP_SRC", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to this.$ =
        ////******/ (() =&gt; { // webpackBootstrap
        ////******/ 	var __webpack_modules__ = ({
        ///
        ////***/ 10:
        ////***/ ((module, __unused_webpack_exports, __webpack_require__) =&gt; {
        ///
        ///const alert = __webpack_require__(282);
        ///
        ///const ScriptsPlus = {
        ///  alert  
        ///};
        ///
        ///module.exports = ScriptsPlus;
        ///
        ////***/ }),
        ///
        ////***/ 282:
        ////***/ ((module) =&gt; {
        ///
        ////**
        /// * Create a modal dialog box notification.
        /// *
        /// * @param message string
        /// * @param title   string
        /// */
        ///function alert(msg, title = &quot;ScriptyStrokes&quot;) {
        ///  let keys = [];
        ///  
        ///  if (typeof msg === &quot; [rest of string was truncated]&quot;;.
        /// </summary>
        public static string SCRIPTS_PLUS_SRC {
            get {
                return ResourceManager.GetString("SCRIPTS_PLUS_SRC", resourceCulture);
            }
        }
    }
}
