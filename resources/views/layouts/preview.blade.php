<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="url" content="{{ url('/') }}">

    <title>{{ config('app.name', 'Quiz Maker') }}</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
{{--    <link href="{{ asset('css/custom.css') }}" rel="stylesheet">--}}
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <link href="{{ asset('css/toast.css') }}" rel="stylesheet">
    <link href="{{ asset('css/jquery.hotspot.css') }}" rel="stylesheet">
    <link href="{{ asset('css/preview.css') }}" rel="stylesheet">
{{--    <link href="{{ asset('css/metro-all.css') }}" rel="stylesheet">--}}
    <link href="{{ asset('css/main.css') }}" rel="stylesheet">
    <link href="{{ asset('css/all.min.css') }}" rel="stylesheet">

    <!-- Scripts -->
    <link href="{{ asset('css/jquery-ui.min.css') }}" rel="stylesheet">
    <script src="{{ asset('js/jquery3.2.1.min.js') }}"></script>
    <script src="{{ asset('js/jquery-ui.min.js') }}"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.7.22/fabric.js"></script>
</head>
<body>
<div class="se-pre-con"></div>
<div id="preview_container">
    <div id="exam_id" style="display: none;"></div>
    @yield('content')
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
<script src="{{ asset('js/toast.js') }}" defer></script>
<script src="{{ asset('js/jquery.hotspot.js') }}" defer></script>
{{--<script src="{{ asset('js/metro.js') }}" defer></script>--}}
<script src="{{ asset('js/main.js') }}" defer></script>
<script src="{{ asset('js/preview.js') }}" defer></script>

</body>
</html>
