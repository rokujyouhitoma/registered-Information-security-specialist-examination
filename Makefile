SRC_JS = src/js/tokenizer.js src/js/vector_scorer.js src/js/fm_index_engine.js
MIN_JS = site/fm_index_engine.min.js

.PHONY: all build clean

all: build

build: $(MIN_JS)
	@echo "🛠️ docs/ 配下の HTML ビルドを実行中..."
	python3 scripts/build_html_docs.py

$(MIN_JS): $(SRC_JS)
	@echo "🛠️ Closure Compiler で $(SRC_JS) をコンパイル中..."
	npx -y google-closure-compiler \
		--js $(SRC_JS) \
		--js_output_file $(MIN_JS) \
		--compilation_level SIMPLE_OPTIMIZATIONS \
		--language_in ECMASCRIPT_2020 \
		--language_out ECMASCRIPT_2020
	@echo "✅ コンパイル完了: $(MIN_JS)"

clean:
	@echo "🧹 コンパイル成果物を削除中..."
	rm -f $(MIN_JS)
	@echo "✅ 削除完了"
