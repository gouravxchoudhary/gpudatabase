<?php
if (function_exists('apache_get_modules')) {
    echo "Mod_rewrite is " . (in_array('mod_rewrite', apache_get_modules()) ? "enabled" : "not enabled");
} else {
    echo "Can't check if mod_rewrite is enabled";
}
?>