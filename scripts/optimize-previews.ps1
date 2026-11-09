Add-Type -AssemblyName System.Drawing

$assetDirectory = Join-Path $PSScriptRoot '..\src\assets'
$outputDirectory = Join-Path $assetDirectory 'coverage-previews'
New-Item -ItemType Directory -Path $outputDirectory -Force | Out-Null

$qualityEncoder = [System.Drawing.Imaging.Encoder]::Quality
$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg' | Select-Object -First 1

Get-ChildItem -LiteralPath $assetDirectory -File | Where-Object {
  $_.Name -match '^kuhaku-\d+\.jpg$'
} | ForEach-Object {
  $destination = Join-Path $outputDirectory $_.Name
  if ($_.Length -le 700KB) {
    Copy-Item -LiteralPath $_.FullName -Destination $destination -Force
    return
  }
  $source = [System.Drawing.Image]::FromFile($_.FullName)
  try {
    $orientation = $source.PropertyItems | Where-Object Id -eq 274 | Select-Object -First 1
    if ($orientation -and [BitConverter]::ToUInt16($orientation.Value, 0) -ne 1) {
      Write-Output "Skipped oriented image: $($_.Name)"
      return
    }

    $scale = [Math]::Min(1.0, [double]1600 / [double][Math]::Max($source.Width, $source.Height))
    $width = [Math]::Max(1, [int][Math]::Round($source.Width * $scale))
    $height = [Math]::Max(1, [int][Math]::Round($source.Height * $scale))
    $bitmap = New-Object System.Drawing.Bitmap $width, $height
    try {
      $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
      try {
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graphics.DrawImage($source, 0, 0, $width, $height)
      } finally { $graphics.Dispose() }

      $parameters = New-Object System.Drawing.Imaging.EncoderParameters 1
      try {
        $parameters.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter $qualityEncoder, ([long]82)
        $bitmap.Save($destination, $jpegCodec, $parameters)
        Write-Output "$($_.Name): $([Math]::Round($_.Length / 1KB)) KB -> $([Math]::Round((Get-Item -LiteralPath $destination).Length / 1KB)) KB"
      } finally { $parameters.Dispose() }
    } finally { $bitmap.Dispose() }
  } finally { $source.Dispose() }
}

$cursorDirectory = Join-Path $assetDirectory 'cursor-previews'
New-Item -ItemType Directory -Path $cursorDirectory -Force | Out-Null
Get-ChildItem -LiteralPath $assetDirectory -File | Where-Object Name -Match '^cursor-(default|hover)\.png$' | ForEach-Object {
  $source = [System.Drawing.Image]::FromFile($_.FullName)
  try {
    $bitmap = New-Object System.Drawing.Bitmap 128, 128, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    try {
      $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
      try {
        $graphics.Clear([System.Drawing.Color]::Transparent)
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $scale = [Math]::Min(128 / $source.Width, 128 / $source.Height)
        $width = [int][Math]::Round($source.Width * $scale)
        $height = [int][Math]::Round($source.Height * $scale)
        $graphics.DrawImage($source, [int][Math]::Round((128 - $width) / 2), [int][Math]::Round((128 - $height) / 2), $width, $height)
      } finally { $graphics.Dispose() }
      $bitmap.Save((Join-Path $cursorDirectory $_.Name), [System.Drawing.Imaging.ImageFormat]::Png)
    } finally { $bitmap.Dispose() }
  } finally { $source.Dispose() }
}

$previewSets = @(
  @{ Directory = 'project-previews'; Files = @('alban.png', 'pokemon.png'); MaxWidth = 1500 }
)

foreach ($set in $previewSets) {
  $previewDirectory = Join-Path $assetDirectory $set.Directory
  New-Item -ItemType Directory -Path $previewDirectory -Force | Out-Null
  foreach ($relativePath in $set.Files) {
    $sourcePath = Join-Path $assetDirectory $relativePath
    if (-not (Test-Path -LiteralPath $sourcePath)) { throw "Missing source: $sourcePath" }
    $source = [System.Drawing.Image]::FromFile($sourcePath)
    try {
      $scale = [Math]::Min(1.0, [double]$set.MaxWidth / [double][Math]::Max($source.Width, $source.Height))
      $width = [Math]::Max(1, [int][Math]::Round($source.Width * $scale))
      $height = [Math]::Max(1, [int][Math]::Round($source.Height * $scale))
      $bitmap = New-Object System.Drawing.Bitmap $width, $height
      try {
        $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
        try {
          $graphics.Clear([System.Drawing.Color]::White)
          $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
          $graphics.DrawImage($source, 0, 0, $width, $height)
        } finally { $graphics.Dispose() }
        $parameters = New-Object System.Drawing.Imaging.EncoderParameters 1
        try {
          $parameters.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter $qualityEncoder, ([long]87)
          $name = [System.IO.Path]::ChangeExtension([System.IO.Path]::GetFileName($relativePath), '.jpg')
          $bitmap.Save((Join-Path $previewDirectory $name), $jpegCodec, $parameters)
        } finally { $parameters.Dispose() }
      } finally { $bitmap.Dispose() }
    } finally { $source.Dispose() }
  }
}
