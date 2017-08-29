#!/bin/bash
set -e

cd /root/contracts
truffle compile --all
truffle migrate
