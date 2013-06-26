set version=0.1.0

tools\jsmin.exe "jQuery.fluentPaging %version% | (c) Boaz den Besten | MIT Licence" < src\jquery.fluentpaging.js > src\jquery.fluentpaging.min.js
NuGet Pack nuget\jQuery.fluentPaging.nuspec -Version %version% -OutputDirectory nuget