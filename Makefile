SRC_JS = \
	src/js/security_validator.js \
	src/js/tokenizer.js \
	src/js/synonym_expander.js \
	src/js/semantic_scorer.js \
	src/js/vector_scorer.js \
	src/js/string_compression.js \
	src/js/sequence_diagram/sequence_models.js \
	src/js/sequence_diagram/sequence_lexer.js \
	src/js/sequence_diagram/sequence_parser.js \
	src/js/sequence_diagram/sequence_svg_renderer.js \
	src/js/sequence_diagram/index.js \
	src/js/sequence_renderer.js \
	src/js/fm_index_engine.js

MIN_JS = site/fm_index_engine.min.js

.PHONY: all build clean

all: build

build: $(MIN_JS)
	@echo "🛠️ docs/ 配下の HTML ビルドを実行中..."
	python3 scripts/build_html_docs.py

$(MIN_JS): $(SRC_JS)
	@echo "🛠️ Closure Compiler (極限厳格設定: ADVANCED_OPTIMIZATIONS & VERBOSE & Warning as Error) で全 JS モジュールをコンパイル中..."
	npx -y google-closure-compiler \
		$(foreach js,$(SRC_JS),--js $(js)) \
		--js_output_file $(MIN_JS) \
		--compilation_level ADVANCED_OPTIMIZATIONS \
		--warning_level VERBOSE \
		--jscomp_error checkTypes \
		--language_in ECMASCRIPT_NEXT \
		--language_out ECMASCRIPT_2020 \
		--strict_mode_input true
	@echo "✅ 全 JS モジュールの極限厳格コンパイル完了: $(MIN_JS)"

clean:
	@echo "🧹 コンパイル成果物を削除中..."
	rm -f $(MIN_JS)
	@echo "✅ 削除完了"
