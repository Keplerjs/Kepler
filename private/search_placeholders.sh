#!/bin/bash

grep -hr '> pluginsTemplate' ../packages/  | cut -d'=' -f2 | sed "s/[\}\']//g" | sort -u
